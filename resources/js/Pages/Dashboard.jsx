import React, { useState, useEffect } from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';



export default function Dashboard(props) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const[isNotif, setIsNotif] = useState(false)

    const handleSubmit = () => {
        const data = {
            title, description, category
        }
        //inertia ke mana, datanya apa
        Inertia.post('/news', data)
        //menginisiasi agar bisa muncul notif
        setIsNotif(true)
        //mengosoglan form setelah disi
        setTitle('')
        setDescription('')
        setCategory('')
    }

    useEffect(() => {
        if (!props.myNews) {
            Inertia.get('/news')
        }
        return;
    }, [])

    //ini lebih ke tempilan
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors }
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">QnA Saya</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white border-b border-gray-200">
                        {isNotif && <div className="alert alert-success shadow-lg">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{props.flash.message}</span>
                            </div>
                        </div>
                        }
                        {/* onChange={(title) => setTitle(title.target.value)} value={title} menangkap apa yang diisi user di form */}
                        <input type="text" placeholder="Pertanyaan" className="m-1 input bg-blue-100 input-bordered w-full" onChange={(title) => setTitle(title.target.value)} value={title}/>
                        <input type="text" placeholder="Deskripsi Jawaban" className="m-1 input bg-blue-100 input-bordered w-full" onChange={(description) => setDescription(description.target.value)} value={description}/>
                        <input type="text" placeholder="Katagori" className="m-1 input bg-blue-100 input-bordered w-full" onChange={(category) => setCategory(category.target.value)} value={category}/>
                        {/* ini untuk bila masuk ke handle bila sudah di kik TAMBAHKAN */}
                        <button className='m-1 btn btn-primary bg-blue-700' onClick={() => handleSubmit()}>TAMBAHKAN</button>
                    </div>
                </div>
                {/* membaca berita yang ditambahkan */}
                <div className='p-4'>
                    {props.myNews && props.myNews.length > 0 ? props.myNews.map((news, i) => {
                        return (
                            <div key={i} className="card w-full lg:w-96 bg-base-100 shadow-xl m-2">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {news.title}
                                        <div className="badge badge-secondary">NEW</div>
                                    </h2>
                                    <p>{news.description}</p>
                                    <div className="card-actions justify-end">
                                        <div className="badge badge-inline">{news.category}</div> 
                                        {/* siap tau mau nambahin author (dari email) */}
                                        {/* <div className="badge badge-outline">Nambah?</div> */}
                                        <div className='badge badge-outline'>
                                            {/* id:news.id itu mengidentifikasi mana si data yang mau diubah */}
                                            <Link href={route('edit.news')} method="get" data={{id: news.id}} as="button">
                                                edit
                                            </Link>
                                        </div>
                                        <div className='badge badge-outline'>
                                        <Link href={route('delete.news')} method="post" data={{id: news.id}} as="button">
                                            delete
                                        </Link>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        )
                    }): 
                    <div className="card w-full lg:w-96 alert alert-info shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span>BELUM ADA QNA</span>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </Authenticated>
    );
}
