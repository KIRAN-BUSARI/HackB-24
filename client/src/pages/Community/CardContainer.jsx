import { useEffect, useState } from 'react'
import Card from './Card'
import axiosInstance from '../../Helper/axiosInstance'
import toast from 'react-hot-toast'

function CardContainer() {
    const [cardData, setCardData] = useState([{
        title: "",
        description: ""
    }])
    useEffect(() => {
        let res = axiosInstance.get("/community/getComunities")
        toast.promise(res, {
            loading: "Loading communities.....",
            success: "Communities loaded successfully..!🥳",
            error: "Error loading communities..."
        })
            .then(res => {
                console.log(res.data)
                setCardData(res.data)
            })

    }, [])
    return <div className="h-[90vh] mx-auto w-full max-w-7xl flex justify-center items-center text-4xl text-orange-600">
        Card Container
        {cardData.map((data) => {
            <Card title={data.title} key={data._id} description={data.description} />
        })}
    </div>

}

export { CardContainer }