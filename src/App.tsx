import { Menu } from "./components/Menu"

function App() {
    return (
        <div className="max-w-xl mx-auto p-6 flex flex-col gap-8">
            <h1 className="text-4xl font-bold text-center">Il bar della scuola</h1>
            <Menu />
        </div>
    )
}

export default App