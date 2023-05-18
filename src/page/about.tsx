

const questions=[
    {
        title:"هل سيكشف موقع صفني هويات المرسلين؟",
        describe:"موقع صفني لن يقوم بكشف هوية المرسلين المسجلين للمستخدمين إلا بموافقتهم",
    },
    {
        title:"هل موقع صفني هاكر؟!",
        describe:"موقع صفني لا يسرق البيانات لكن البرامج والمواقع المقلدة له قد تفعل ذلك",
    }
    ,
    {
        title:"هل يمكن لزوار صفني الإطلاع على رسائلي؟",
        describe:"لا يمكنهم ذلك ما لم تشارك رسائلك بنفسك",
    },
    {
        title:"هل يوجد تطبيق لموقع صفني على الجوال؟",
        describe:"نعم، تطبيق صفني موجود على متجر برامج أبل وأندرويد",
    },
    {
        title:"هل يمكن الرد على الرسائل؟",
        describe:"هذا الخيار قيد التطوير و سيطلق قريبا"
    }
]


const About=()=>{

    return(
        <div>
            <div className="container">
                <div className="pb-5 border-b-2 border-[#d4dbe0] rounded">
                    <h2 className=" mb-2 font-bold text-2xl">عن الموقع</h2>
                    <p className="text-sm">موقع صفني يساعدك في التعرف على عيوبك ومزاياك عن طريق الحصول على نقد من موظفيك وأصدقائك بسرية تامة دون معرفة المرسل</p>
                </div>

                <div className=" mt-4">
                    <h3 className="mb-4 font-bold text-xl">أسئلة متكررة</h3>
                    <div className="flex flex-col gap-3">
                        {questions.map(({title,describe})=>{
                            return(
                                <div>
                                    <h4 className=" font-bold  text-sm">{title}</h4>
                                    <p className=" text-sm">{describe}</p>
                                </div>
                            )

                        })}
                    </div>

                </div>
            </div>
        </div>
    )
}


export default About 