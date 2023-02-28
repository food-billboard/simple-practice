import {
  useState,
  useRef,
  useCallback,
  useMemo,
  useEffect
} from 'react'
import { Rnd } from 'react-rnd'
import type { RndResizeCallback, RndDragCallback, RndResizeStartCallback } from 'react-rnd'
import EventEmitter from 'eventemitter3';
import ReactSelecto from 'react-selecto'
import { throttle } from 'lodash'

// 大屏组件的数据类型
type ComponentList = {
  id: string
  width: number
  height: number
  left: number
  top: number
  background: string
}

// 创建事件
const eventEmitter = new EventEmitter()
const EVENT_MAP = {
  DRAG_START: "DRAG_START",
  DRAG: "DRAG",
  DRAG_STOP: "DRAG_STOP",
  RESIZE_START: "RESIZE_START",
  RESIZE: "RESIZE",
  RESIZE_STOP: "RESIZE_STOP"
}

const getComponentStyle = (position: any, size: any) => {
  const newWidth = parseInt(size.style.width) || 20;
  const newHeight = parseInt(size.style.height) || 20;
  return {
    width: newWidth,
    height: newHeight,
    left: position.x,
    top: position.y,
  };
};

// 这里用到的 dataset 是html原生data-的属性  
// 用于标识组件
const Selecto = (props: {
  setSelect: (value: string[]) => void;
  select: string[]
}) => {
  const { setSelect, select } = props;

  // 这里内部控制一个状态
  // 是因为不想频繁刷新选中的状态 
  // 其实也没有必要
  // 最后拖拽完成再更改选中状态就可以了 
  const currentSelect = useRef<string[]>([]);

  // 拖拽完成更改状态
  const handleSelectEnd = useCallback(() => {
    setSelect(currentSelect.current);
  }, [setSelect]);

  // 拖拽中  
  const handleSelect = useCallback((e: any) => {
    const { added, removed } = e;

    const toAddList = added.reduce((acc: any, element: any) => {
      const select = element.dataset.id;
      acc.push(select)
      return acc;
    }, []);
    const toRemoveList = removed.map((element: any) => element.dataset.id);

    const newSelect = [
      ...currentSelect.current.filter((item) => !toRemoveList.includes(item)),
      ...toAddList,
    ];
    currentSelect.current = newSelect;
  }, []);

  const handleDragStart = useCallback(
    (e: any) => {
      try {
        // 组件id
        const componentId = e.inputEvent.target.dataset?.id;
        // 组件缩放的边框  
        // 不排除他的话无法缩放
        const componentBorder =
          e.inputEvent.target.className.includes('react-select-to-border');
        // 可以在这里扩展更多的判断
        // 因为根据前面介绍可能会从组内元素 或者 外层不同的元素开始拖拽  
        // 可能会存在冲突  

        if (!select.includes(componentId) && !componentBorder) {
          setSelect?.([]);
        } else {
          e.stop();
        }
      } catch (err) {
        e.stop();
      }
    },
    [setSelect, select],
  );

  return (
    <ReactSelecto
      dragContainer={'#container'}
      selectableTargets={['.react-select-to']}
      hitRate={100}
      toggleContinueSelect={'shift'}
      selectByClick
      selectFromInside={false}
      ratio={0}
      onDragStart={handleDragStart}
      onSelectEnd={handleSelectEnd}
      onSelect={handleSelect}
    ></ReactSelecto>
  );
};

const Component = (props: ComponentList & {
  isSelect: boolean
  isMultiSelect: boolean
  onChange: (value: Partial<ComponentList> & { id: string }) => void
}) => {

  const {
    isSelect,
    background,
    left,
    top,
    width,
    height,
    id,
    onChange,
    isMultiSelect
  } = props;

  // 内部的位置信息
  const [statePosition, setStatePosition] = useState({
    x: left,
    y: top
  });
  // 内部的尺寸信息
  const [stateSize, setStateSize] = useState({
    width,
    height
  })
  // 是否处于拖拽中
  const [isDealing, setIsDealing] = useState<boolean>(false)

  // 拖拽中的组件的信息
  // 使用ref是为了刷新
  const dragInfo = useRef({
    left: statePosition?.x || 0,
    top: statePosition?.y || 0,
    drag: false,
  });
  // 缩放的组件信息
  const resizeInfo = useRef({
    left: statePosition?.x || 0,
    top: statePosition?.y || 0,
    width: stateSize?.width || 0,
    height: stateSize?.height || 0,
    resize: false,
  });

  // 根据是否操作的状态使用不同的状态信息
  // 位置
  const position = useMemo(() => {
    if (isDealing) {
      return statePosition;
    }
    return {
      x: left,
      y: top
    };
  }, [left, top, statePosition, isDealing]);

  // 根据是否操作的状态使用不同的状态信息
  // 尺寸
  const size = useMemo(() => {
    if (isDealing) return stateSize;
    return {
      width,
      height
    };
  }, [width, height, stateSize, isDealing]);

  // 调整大小方法
  const resizeMethod: any = (
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any,
    isSelf: boolean,
    value: ComponentList,
    outerResizeInfo: any,
  ) => {
    // 获取到之前的位置信息
    const resizePositionX = (outerResizeInfo || resizeInfo.current).left;
    const resizePositionY = (outerResizeInfo || resizeInfo.current).top;

    let newWidth = 0;
    let newHeight = 0;
    // delta 
    let realDeltaX =
      typeof resizePositionX === 'number' ? position.x - resizePositionX : 0;
    let realDeltaY =
      typeof resizePositionY === 'number' ? position.y - resizePositionY : 0;

    // 获取当前的状态信息
    const newStyle = getComponentStyle(position, ref);
    let defaultChangeConfig: Partial<ComponentList> = {};

    // 鼠标操作组件
    if (isSelf) {
      const { width, height } = newStyle;
      newWidth = width;
      newHeight = height;
      defaultChangeConfig = {
        ...newStyle
      };
    } 
    // 不是鼠标操作组件
    else {
      const { width, height, left, top } = value;
      let realDeltaWidth = outerResizeInfo
        ? newStyle.width - outerResizeInfo.width
        : 0;
      let realDeltaHeight = outerResizeInfo
        ? newStyle.height - outerResizeInfo.height
        : 0;

      newWidth = width + realDeltaWidth;
      newHeight = height + realDeltaHeight;
      defaultChangeConfig = {
        width: newWidth,
        height: newHeight,
        left: left + realDeltaX,
        top: top + realDeltaY,
      };
    }

    // 不考虑嵌套组
    if (true) return defaultChangeConfig
    // TODO 
    // 可以继续在下面处理操作组的逻辑
  };

  // 拖拽方法
  const dragMethod: any = (
    event: any,
    data: any,
    isSelf: boolean,
    value: any,
    outerDragInfo: any,
  ) => {
    const { x, y, deltaX, deltaY } = data;

    const left = x;
    const top = y;

    // 鼠标操作组件
    if (isSelf) {
      return {
        left,
        top,
      };
    }

    // 不是鼠标操作组件则使用delta来进行计算
    return {
      left: value.left + deltaX,
      top: value.top + deltaY,
    };
  };

  // 多组件复合调整大小
  const multiOnResize: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position,
  ) => {
    const newStyle = getComponentStyle(position, ref);

    resizeInfo.current.resize = true;

    // 触发事件
    eventEmitter.emit(
      EVENT_MAP.RESIZE,
      id,
      e,
      direction,
      ref,
      delta,
      position,
      resizeInfo.current,
    );

    // 更新自身的状态
    resizeInfo.current = {
      ...resizeInfo.current,
      ...newStyle,
    };
  };

  // 复合拖拽
  const multiOnDrag: RndDragCallback = (event, data) => {
    const { x, y } = data;

    dragInfo.current.drag = true;

    // 计算delta给其他联动组件使用
    const deltaX = x - dragInfo.current.left;
    const deltaY = y - dragInfo.current.top;

    // 触发事件
    eventEmitter.emit(
      EVENT_MAP.DRAG,
      id,
      event,
      {
        ...data,
        deltaX,
        deltaY,
      },
      dragInfo.current,
    );

    // 更新自身状态
    dragInfo.current = {
      ...dragInfo.current,
      left: x,
      top: y,
    };
  };

  // realtion开头的都是监听
  // 鼠标操作的目标组件发出的自定义事件
  const onRelationDragStart = (targetId: string) => {
    if (!isSelect || id === targetId) return;
    setIsDealing(true);
  };

  const onRelationDrag = (
    targetId: string,
    event: any,
    data: any,
    outerDragInfo: any,
  ) => {
    if (!isSelect || id === targetId) return;
    const nextPosition = dragMethod(
      event,
      data,
      false,
      {
        left: dragInfo.current.left || 0,
        top: dragInfo.current.top || 0,
      },
      outerDragInfo,
    );
    const nextState = {
      x: nextPosition.left || 0,
      y: nextPosition.top || 0,
    };
    dragInfo.current = {
      ...dragInfo.current,
      ...nextPosition,
    };
    setStatePosition((prev) => ({ ...nextState }));
  };

  const onRelationDragStop = (
    targetId: string,
    event: any,
    data: any,
    outerDragInfo: any,
  ) => {
    if (!isSelect || id === targetId) return;
    setIsDealing(false);
    const nextPosition = dragMethod(
      event,
      data,
      false,
      {
        left: dragInfo.current.left || 0,
        top: dragInfo.current.top || 0,
      },
      outerDragInfo,
    );
    dragInfo.current = {
      ...dragInfo.current,
      ...nextPosition,
    };

    const { left, top } = dragInfo.current;
    onChange({
      id,
      left,
      top
    })
  };

  const onRelationResizeStart = (targetId: string, direction: any) => {
    if (!isSelect || id === targetId) return;
    setIsDealing(true);
  };

  const onRelationResize = (
    targetId: string,
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any,
    outerResizeInfo: any,
  ) => {
    if (!isSelect || id === targetId) return;

    const nextConfig = resizeMethod(
      e,
      direction,
      ref,
      delta,
      position,
      false,
      {
        left: resizeInfo.current.left || 0,
        top: resizeInfo.current.top || 0,
        width: resizeInfo.current.width || 0,
        height: resizeInfo.current.height || 0,
      },
      outerResizeInfo,
    );

    const { left, top, width, height } = nextConfig;
    resizeInfo.current = {
      ...resizeInfo.current,
      left,
      top,
      width,
      height
    };

    setStatePosition((prev) => ({
      x: resizeInfo.current.left,
      y: resizeInfo.current.top
    }));
    setStateSize((prev) => ({
      width: resizeInfo.current.width,
      height: resizeInfo.current.height
    }));
  };

  const onRelationResizeStop = (
    targetId: string,
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any,
    outerResizeInfo: any,
  ) => {
    if (!isSelect || id === targetId) return;

    setIsDealing(false);
    const nextConfig = resizeMethod(
      e,
      direction,
      ref,
      delta,
      position,
      false,
      {
        left: resizeInfo.current.left || 0,
        top: resizeInfo.current.top || 0,
        width: resizeInfo.current.width || 0,
        height: resizeInfo.current.height || 0,
      },
      outerResizeInfo,
    );

    const { left, top, width, height } = nextConfig;
    resizeInfo.current = {
      ...resizeInfo.current,
      left,
      top,
      width,
      height
    };

    const { left: x, top: y, width: currentWidth, height: currentHeight } = resizeInfo.current;

    onChange({
      id,
      left: x || 0,
      top: y || 0,
      width: (currentWidth as number) || 20,
      height: (currentHeight as number) || 20,
    })
  };

  const multiResizeStart: RndResizeStartCallback = (_, direction) => {
    eventEmitter.emit(
      EVENT_MAP.RESIZE_START,
      id,
      direction,
    );
    resizeInfo.current.resize = true;
  }

  const _onDrag: RndDragCallback = (event: any, data: any) => {
    // * 复合移动
    if (isMultiSelect) {
      multiOnDrag(event, data);
    }
  };

  // 节流帮助减少频繁的更新
  // 因为每一次都更新时没有必要的
  const multiDrag = throttle(_onDrag, 100);

  const _onResize: RndResizeCallback = (...args) => {
    // * 复合尺寸修改
    if (isMultiSelect) {
      multiOnResize(...args);
    }
  };

  const multiResize = throttle(_onResize, 100);

  const multiDragStop: RndDragCallback = (event, data) => {
    const { x, y } = data;
    if (isMultiSelect) {
      const deltaX = x - dragInfo.current.left;
      const deltaY = y - dragInfo.current.top;

      eventEmitter.emit(
        EVENT_MAP.DRAG_STOP,
        id,
        event,
        {
          ...data,
          deltaX,
          deltaY,
        },
        dragInfo.current,
      );

      dragInfo.current = {
        ...dragInfo.current,
        left: x,
        top: y,
      };
    }
    dragInfo.current.drag = false;
  };

  const multiResizeStop: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position,
  ) => {
    const newStyle = getComponentStyle(position, ref);

    resizeInfo.current.resize = true;

    eventEmitter.emit(
      EVENT_MAP.RESIZE_STOP,
      id,
      e,
      direction,
      ref,
      delta,
      position,
      resizeInfo.current,
    );

    resizeInfo.current.resize = false;

    resizeInfo.current = {
      ...resizeInfo.current,
      ...newStyle,
    };
  };

  const multiDragStart: RndDragCallback = () => {
    eventEmitter.emit(
      EVENT_MAP.DRAG_START,
      id,
    );
    dragInfo.current.drag = true;
  }

  const onDragStart: RndDragCallback = (...args) => {
    // * 未选中不触发事件
    if (!isSelect) return;
    multiDragStart(...args)
  }

  const onDrag: RndDragCallback = (...args) => {
    // * 未选中不触发事件
    if (!isSelect) return;
    multiDrag(...args)
  };

  const onResize: RndResizeCallback = (...args) => {
    // * 未选中不触发事件
    if (!isSelect) return;
    multiResize(...args)
  }

  const onDragStop: RndDragCallback = (event, data) => {
    // * 未选中不触发事件
    if (!isSelect) return;
    onChange({
      ...dragMethod(event, data, true),
      id
    })

    multiDragStop(event, data);
  };

  const onResizeStart: RndResizeStartCallback = (...args) => {
    // * 未选中不触发事件
    if (!isSelect) return;
    multiResizeStart(...args)
  }

  const onResizeStop: RndResizeCallback = (
    e,
    direction,
    ref,
    delta,
    position,
  ) => {
    // * 未选中不触发事件
    if (!isSelect) return;

    onChange({
      ...resizeMethod(e, direction, ref, delta, position, true),
      id
    })

    multiResizeStop(e, direction, ref, delta, position)
  };

  // 绑定拖拽和缩放的事件
  // 用于多选组件间通信
  useEffect(() => {
    if(isSelect) {
      eventEmitter.addListener(
        EVENT_MAP.DRAG_START,
        onRelationDragStart,
      );
      eventEmitter.addListener(
        EVENT_MAP.DRAG,
        onRelationDrag,
      );
      eventEmitter.addListener(
        EVENT_MAP.DRAG_STOP,
        onRelationDragStop,
      );
      eventEmitter.addListener(
        EVENT_MAP.RESIZE_START,
        onRelationResizeStart,
      );
      eventEmitter.addListener(
        EVENT_MAP.RESIZE,
        onRelationResize,
      );
      eventEmitter.addListener(
        EVENT_MAP.RESIZE_STOP,
        onRelationResizeStop,
      );
    }
    return () => {
      eventEmitter.removeListener(
        EVENT_MAP.DRAG_START,
        onRelationDragStart,
      );
      eventEmitter.removeListener(
        EVENT_MAP.DRAG,
        onRelationDrag,
      );
      eventEmitter.removeListener(
        EVENT_MAP.DRAG_STOP,
        onRelationDragStop,
      );
      eventEmitter.removeListener(
        EVENT_MAP.RESIZE_START,
        onRelationResizeStart,
      );
      eventEmitter.removeListener(
        EVENT_MAP.RESIZE,
        onRelationResize,
      );
      eventEmitter.removeListener(
        EVENT_MAP.RESIZE_STOP,
        onRelationResizeStop,
      );
    };
  }, [isSelect]);

  // 全局组件的尺寸信息状态更新时
  // 同步到组件内部
  useEffect(() => {
    setStatePosition({
      x: left,
      y: top
    });
    resizeInfo.current = {
      ...resizeInfo.current,
      left: left ?? resizeInfo.current.left,
      top: top ?? resizeInfo.current.top,
    };
    dragInfo.current = {
      ...dragInfo.current,
      left: left ?? dragInfo.current.left,
      top: top ?? dragInfo.current.top,
    };
  }, [left, top]);

  // 全局组件的宽高信息状态更新时
  // 同步到组件内部
  useEffect(() => {
    setStateSize({
      width,
      height
    });
    resizeInfo.current = {
      ...resizeInfo.current,
      width: width ?? resizeInfo.current.width,
      height: height ?? resizeInfo.current.height,
    };
  }, [width, height]);

  return (
    <Rnd
      style={{
        border: `1px solid ${isSelect ? 'black' : 'transparent'}`
      }}
      enableResizing={isSelect}
      disableDragging={!isSelect}
      default={{
        x: 0,
        y: 0,
        width: 320,
        height: 200,
      }}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragStop={onDragStop}
      onResizeStart={onResizeStart}
      onResize={onResize}
      onResizeStop={onResizeStop}
      minWidth={20}
      minHeight={20}
      position={position}
      size={size}
      // 设置缩放边框的class
      // 不设置的话会导致与缩放冲突 
      resizeHandleClasses={[
        'left',
        'top',
        'right',
        'bottom',
        'topLeft',
        'topRight',
        'bottomLeft',
        'bottomRight',
      ].reduce<any>((acc, cur) => {
        acc[cur] = 'react-select-to-border';
        return acc;
      }, {})}
    >
      <div
        style={{
          backgroundColor: background,
          width: '100%',
          height: '100%'
        }}
        // 用于Selecto组件中的组件标识
        data-id={id}
        // 和Selecto组件中的selectableTargets对应
        className="react-select-to"
      >

      </div>
    </Rnd>
  )

}

const Parent = () => {

  const [componentList, setComponentList] = useState<ComponentList[]>([
    {
      id: '1',
      background: 'red',
      left: 20,
      top: 30,
      width: 200,
      height: 100
    },
    {
      id: '2',
      background: 'green',
      left: 200,
      top: 300,
      width: 100,
      height: 100
    },
    {
      id: '3',
      background: 'gray',
      left: 250,
      top: 50,
      width: 50,
      height: 50
    },
    {
      id: '4',
      background: 'blue',
      left: 250,
      top: 100,
      width: 100,
      height: 100
    },
    {
      id: '5',
      background: 'pink',
      left: 400,
      top: 150,
      width: 100,
      height: 100
    },
    {
      id: '6',
      background: 'yellow',
      left: 400,
      top: 300,
      width: 100,
      height: 100
    }
  ])
  const [select, setSelect] = useState<string[]>([])

  // 更新组件信息
  const onComponentChange = useCallback((value: Partial<ComponentList> & { id: string }) => {
    const { id } = value
    setComponentList(prev => {
      return prev.map(item => {
        if (item.id !== id) return item
        return {
          ...item,
          ...value
        }
      })
    })
  }, [])

  return (
    // 和Selecto组件中的container对应
    <div
      id="container"
      style={{
        width: '100vw',
        height: '100vh'
      }}
    >
      <Selecto
        select={select}
        setSelect={setSelect}
      />
      {
        componentList.map(component => {
          return (
            <Component
              key={component.id}
              {...component}
              isSelect={select.includes(component.id)}
              onChange={onComponentChange}
              isMultiSelect={select.length > 1}
            />
          )
        })
      }
    </div>
  )

}

export default Parent
