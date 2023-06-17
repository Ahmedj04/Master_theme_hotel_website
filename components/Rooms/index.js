import React, { useState, useEffect } from 'react'
import Carousel from 'better-react-carousel';
import RoomDetails from './RoomDetails';
import RoomServices from './RoomServices';
import CarousalComponent from '../NewTheme/CarousalComponent';


function Rooms({rooms}) {
    const [selectedRoom, setSelectedRoom] = useState([]);
    const [showRoom, setShowRoom] = useState({
        'visible': 0,
        'index': undefined,
    });

    //just for printing the value of state selectedRoom
    useEffect(() => (
        console.log(selectedRoom)
    ), [selectedRoom]) //it will be called when ever there is any change in the state selectedRoom

    return (
        <section>
            <div className="bg-[url('/room-bg.jpg')] pt-20 pb-2">
                <div className='mx-2 md:mx-12'>
                    <div className='mx-4 mb-10 text-center'><h3 className='text-3xl lg:text-5xl font-normal tracking-widest'>HOTEL ROOMS</h3></div>
                    <div>
                        <Carousel cols={4} rows={1} gap={10} loop={false}
                            responsiveLayout={[
                                {
                                    breakpoint: 640,
                                    cols: 2,
                                    rows: 1,
                                    gap: 0,
                                    loop: false,
                                    autoplay: 1000
                                },
                                {
                                    breakpoint: 768,
                                    cols: 3,
                                    rows: 1,
                                    gap: 0,
                                    loop: false,
                                    autoplay: 1000
                                },
                                {
                                    breakpoint: 1020,
                                    cols: 3,
                                    rows: 1,
                                    gap: 0,
                                    loop: false,
                                    autoplay: 1000
                                },
                                {
                                    breakpoint: 1280,
                                    cols: 3,
                                    rows: 1,
                                    gap: 0,
                                    loop: false,
                                    autoplay: 1000
                                },
                            ]}
                        >
                            {rooms?.map((room, index) => {
                                return (
                                    <Carousel.Item key={index} >
                                        <div className={`cursor-pointer text-center pb-5 md:py-5 lg:py-10 md:rounded-md ${selectedRoom?.room_id === room?.room_id ? `${`md:shadow-xl md:bg-slate-200 lg:shadow-xl lg:bg-slate-100`}` : ``}`}
                                            onClick={() => {
                                                (showRoom.index != index) ? setShowRoom({ "visible": 1, "index": index }) : setShowRoom({ "visible": 0, "index": undefined });
                                                setSelectedRoom(room);
                                            }}
                                        >
                                            {Object.keys(room).includes('room_images') ? <img className='rounded-md md:w-10/12 md:m-auto lg:w-10/12' src={room?.room_images[0].image_link}></img> : <img className='rounded-md md:w-10/12 md:m-auto lg:w-10/12' src="https://themewagon.github.io/sogo/images/slider-3.jpg" alt="image" />}

                                            <p className="mt-5 text-xl font-semibold">{room?.room_name}</p>

                                            {room?.unconditional_rates?.map((resource, index) => {
                                                return <p key={index} className="text-lg text-gray-500 font-medium">{resource?.baserate_currency + " " + resource?.baserate_amount}</p>
                                            })}

                                        </div>
                                    </Carousel.Item>
                                )
                            })}
                        </Carousel>
                        {selectedRoom.length != 0 ? <div className="pt-5 md:mt-8 md:pt-5 md:mb-10 rounded shadow-lg bg-slate-100">
                            <div className="flex justify-between px-5 pt-0">
                                <p className=' text-slate-500 font-semibold tracking-wide text-center text-2xl'>{selectedRoom?.room_name} - ({selectedRoom?.room_type?.replaceAll("_", " ")})</p>
                                {selectedRoom?.unconditional_rates?.map((resource, index) => {
                                    return <p key={index} className="text-lg text-gray-500 font-medium">{resource?.baserate_currency + " " + resource?.baserate_amount}</p>
                                })}
                            </div>

                            <p className='py-5 px-3 text-slate-500 tracking-wide text-center'>{selectedRoom.room_description}</p>
                            {Object.keys(selectedRoom).includes('room_images') ?
                                <CarousalComponent
                                    id="roomPhotos"
                                    type='room'
                                    data={selectedRoom?.room_images}
                                />
                                : <img className='rounded-md md:m-auto md:w-5/12' src="https://themewagon.github.io/sogo/images/slider-3.jpg" alt="image" />
                            }

                            <RoomDetails
                                room={selectedRoom}

                            />

                            {Object.keys(selectedRoom).includes("room_facilities") ?
                                <RoomServices
                                    room={selectedRoom}
                                />
                                : <></>}
                        </div> : <></>
                        }
                    </div>
                </div>


            </div>
        </section>
    )
}

export default Rooms