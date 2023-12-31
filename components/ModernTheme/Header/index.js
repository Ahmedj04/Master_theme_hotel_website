import React, { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Router from 'next/router';
import ContactUsModal from '../Modals/ContactUsModal';
import color from '../Data/Colors.json'

function Header({ allHotelDetails, menu, setMenu, themeColor, setThemeColor }) {

    const [showModalContactUs, setShowModalContactUs] = useState(0);
    const [headerColor, setHeaderColor] = useState(themeColor);

    useEffect(() => {
        setHeaderColor(themeColor)
    }, [themeColor]);


    function clickHandler(id, action) {
        action === 'modal' ? id() : Router.push(`${window?.location?.origin}/${id}`)
    }

    return (
        <header className={`h-auto ${themeColor.bgColor}`}>r

            <div className='mx-8'>
                <div className='py-8 pr-1 flex justify-between md:py-10 lg:py-16'>
                    <div className='mx-4 text-center md:mx-auto'>
                        <StarRatings
                            rating={allHotelDetails?.star_rating}
                            starRatedColor="#FDCC0D"
                            starDimension='16px'
                            numberOfStars={5}
                            starSpacing='1px'
                            name='rating'
                        />

                        <h1 className={`${themeColor.textColor} text-xl pt-2 md:text-4xl md:font-light tracking-widest uppercase`}>{(allHotelDetails?.property_name)}</h1>
                    </div>


                    {/* for small screens  */}
                    <div className='my-auto md:hidden lg:hidden'>
                        <i className='text-white cursor-pointer ' onClick={() => setMenu(!menu)}>{menu === true ? <CloseIcon sx={{ fontSize: 30, color: themeColor.menuColor }} /> : <MenuIcon sx={{ fontSize: 30, color: themeColor.menuColor }} />}</i>
                    </div>

                    <div className=" relative w-20 lg:max-w-sm flex">
                        <select onChange={(e) => {
                            switch (e.target.value) {
                                case 'black': setThemeColor(color.black);
                                    break;
                                case 'red': setThemeColor(color.red);
                                    break;
                                case 'green': setThemeColor(color.green);
                                    break;
                                case 'white': setThemeColor(color.white);
                                    break;
                                default:
                            }
                            localStorage.setItem("color", e.target.value)
                        }}
                            style={{ fontSize: "10px" }} className="text-xs my-auto text-slate-300 w-full relative -top-1 md:top-2 lg:-top-1 p-2 bg-transparent border rounded-md shadow-sm outline-none hover:border-indigo-600">
                            <option className='text-gray-500 '>Color</option>
                            <option className='text-gray-500 lg:text-xs' value={'black'}>Black</option>
                            <option className='text-gray-500 lg:text-xs' value={'red'}>Red</option>
                            <option className='text-gray-500 lg:text-xs' value={'green'}>Green</option>
                            <option className='text-gray-500 lg:text-xs' value={'white'}>White</option>
                        </select>
                    </div>
                </div>

                {/* for medium and large screens */}
                <nav className='text-center pb-8 hidden md:block lg:block'>
                    <ul className='flex justify-center gap-10 font-bold'>
                        {[{ "label": "About", "id": "#about", "action": "href" },
                        { "label": "Rooms", "id": "#rooms", "action": "href" },
                        { "label": "Photos", "id": "#photos", "action": "href" },
                        { "label": "Services", "id": "#services", "action": "href" },
                        { "label": "Reviews", "id": "#reviews", "action": "href" },
                        { "label": "Contact Us", "id": () => { setShowModalContactUs(1) }, "action": "modal" }
                        ].map((item, index) => {
                            return (
                                <li key={index} onClick={() => clickHandler(item?.id, item?.action)} className='text-gray-400 cursor-pointer hover:text-white hover:underline'>{item?.label}</li>
                            )
                        })}
                    </ul>

                </nav>
            </div>

            {/* modal for contact us*/}
            <div className={showModalContactUs === 1 ? "block" : "hidden"}>
                <ContactUsModal
                    setShowModalContactUs={setShowModalContactUs}
                />
            </div>
        </header>
    )
}

export default Header