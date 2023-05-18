

const details=[
    {
        id:1,
        title:"يمكنك إنشاء حساب صراحة خاص بك بكل سهولة من هنا",
        description:"سيكتب الأصدقاء والآخرون رأيهم الشخصي و الصادق عنك على هذا الرابط"
    },
    {
        id:2,
        title:"يمكنك نشر الحساب الخاص بك على Facebook أو Twitter أو Skype أو أي مكان تريده أنت",
        description:"",
    },

    {
        id:3,
        title:"يمكنك قراءة ما كتبه الناس عنك",
        description:"إن الرسائل التي تصلك خاصة بك وحدك، ولا يمكن لأحد سواك مشاهدتها",
    },

    {
        id:4,
        title:"من المستحسن أن تنشر الرسائل المفضلة لديك",
        description:"يمكنك الاختيار بجعل الرسائل عامة للجميع، وبذلك ستسمح للآخرين بمشاهدتها.",

    }
]


const Home=()=>{
    console.log("home")

    return(
        <div >
            <div className="container">
                <div className="left">
                    <div>
                        <h2 className="font-bold text-2xl">هل أنت مستعد لمواجهة الصراحة؟</h2>
                        <p>احصل على نقد بناء بسرية تامة من زملائك في العمل وأصدقائك.</p>
                    </div>

                    <div className="flex gap-6 mt-6 mb-4">
                        <div>
                            <h4 className="font-bold mb-3">في العمل</h4>
                            <ul className="font-light">
                                <li>عزز نقاط القوة لديك</li>
                                <li>عالج نقاط ضعفك</li>

                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold  mb-3">مع أصدقائك</h4>
                            <ul className="font-light">
                                <li>عزز صداقاتك بمعرفة مزاياك وعيوبك</li>
                                <li>مكّن أصحابك من مصارحتك</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-x-2">
                        <span>تسجيل</span>
                        <span>دخول</span>

                    </div>
                </div>
                <div className="right">
                    
                </div>


            </div>
            <Details/>

        </div>
    )
}



const Details=()=>{
    return(
        <div className="bg-[#dcf2f3] text-[black] mt-6 pt-4">
            <div className="container flex md:flex-col  gap-3">
                {details.map(({id,title,description})=>{
                    return(
                        <div className="flex flex-col gap-2 p-2" key={id} >
                            <div className="font-bold">{title}</div>
                            <div>{description}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Home