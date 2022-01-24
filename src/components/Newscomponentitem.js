import React from 'react'

export default function Newscomponentitem(props) {
    let {title, description, imgurl, sourcename, newsurl, publishedAt} = props;
    return (
        <>
            <div className="flex flex-col shadow-md bg--200 rounded-lg p-4 m-2 lg:w-1/5 md:w-1/2 sm:w-1/2 mt-3 mb-6 dark:bg-slate-800">
                    <div className="relative rounded-lg">
                    <span className="absolute right-2 top-2 z-10 bg-pink-100 text-pink-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-pink-200 dark:text-pink-900">{sourcename}</span>
                    <a href="#">
                        <img className="rounded-t-lg object-cover w-full h-48 relative" src={imgurl} alt="" />
                    </a>
                    </div>
                    <div className="flex flex-col items-start mt-4">
                        <h4 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h4>
                        <p className="text-sm text-gray-900 dark:text-gray-200">{description}</p>
                        <span className="text-xs text-gray-900 dark:text-gray-200">Published: {new Date(publishedAt).toGMTString()}</span>
                        <a href={newsurl} target="blank" className="p-2 leading-none rounded font-medium mt-3 bg-fuchsia-400 text-xs uppercase dark: text-white">Read More</a>
                    </div>
                </div>
        </>
    )
}

