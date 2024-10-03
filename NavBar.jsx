import ricketmorty from "../assets/ricketmorty.png"

export default function NavBar() {
    return (
        <div className="flex justify-center items-center h-[100px]">
            <img className="w-[180px]" src={ricketmorty} alt="" />
        </div>
    )
}