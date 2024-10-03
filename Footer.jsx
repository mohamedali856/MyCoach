import ricketmorty from "../assets/ricketmorty.png"

export default function Footer(){
    return (
        <div className="bg-[#F6F6F7] border-[#E8E8EA] border-[1px] flex justify-center items-center h-[100px]">
            <img className="w-[180px]" src={ricketmorty} alt="" />
        </div>
    )
}