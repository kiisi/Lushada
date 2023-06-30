
const Footer = () => {

    let date = new Date()
    let year = date.getFullYear()


    return (
        <footer className="max-w-xl px-3 mx-auto">
            <div className="border-t-[1px] border-[#EAECEF] py-[20px] px-3">
                <p className="text-[#707A8A] text-center">Lushada © {year}</p>
            </div>
        </footer>
    )
}

export default Footer