import MarkDownIt from 'markdown-it'

const md = new MarkDownIt()
const result = md.render('')

export default function HomePage() {
  return (
    <div>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}
