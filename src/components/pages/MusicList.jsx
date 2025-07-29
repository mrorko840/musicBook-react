import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import AuthUser from '../../helpers/AuthUser';
import CustomLoader from '../mini_components/CustomLoader';
import AddMusicModal from '../modals/AddMusicModal';
import UpdateMusicModal from '../modals/UpdateMusicModal';
import RemoveMusicModal from '../modals/RemoveMusicModal';

export default function MusicList() {
    const [musicList, setMusicList] = useState("");
    const { http } = AuthUser();
    const { folderId } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        http.get(`/folder/${folderId}/music`).then(({ data }) => {
            console.log(data);
            setMusicList(data.musics);
            setIsLoading(false);
        });
    }, []);

    const addMusic = (musicName, musicLink) => {
        http.post('/music/add', {
            name: musicName,
            link: musicLink,
            folder: folderId
        }).then(({ data }) => {
            console.log(data);
            setMusicList(data.musics);
            document.getElementById('addMusicModal').close();
            toast.success("Music Added Successfully!");
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateMusic = (musicName, musicLink, musicId) => {
        http.post('/music/update/' + musicId, {
            name: musicName,
            link: musicLink
        }).then(({ data }) => {
            console.log(data);
            setMusicList(data.musics);
            document.getElementById('updateMusicModal').close();
            toast.success("Music Updated Successfully!");
        }).catch((err) => {
            console.log(err);
        });
    }

    const deleteMusic = (musicId) => {
        http.post('/music/delete/' + musicId).then(({ data }) => {
            console.log(data);
            setMusicList(data.musics);
            document.getElementById('removeMusicModal').close();
            toast.success("Music Removed Successfully!");
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="mx-[8px] py-[10px] mt-2">
            <div className="grid grid-cols-1 gap-4">
                {musicList
                    ? musicList.map((music, index) => (
                        <div
                            key={music._id}
                            className="flex items-center gap-3 bg-white/10 border-[1px] border-white/20 text-white rounded-[18px] p-5 shadow-md shadow-gray-700/10"
                        >
                            <Link className="flex gap-3 items-center flex-auto" to={music.link}>
                                <img className="w-[30px] opacity-[50%] brightness-[100]" src="https://i.imgur.com/C21leaZ.png" alt="" />
                                <h1 className="text-sm font-bold">{music.name}</h1>
                            </Link>

                            {
                                user && user.role == 'admin' ? (
                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <div tabIndex={0} role="button" className="cursor-pointer m-1">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </div>
                                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box !z-[2] w-52 p-2 shadow-sm">
                                            <li>
                                                <a onClick={() => {
                                                    console.log("Music Id:", music._id);

                                                    document.getElementById('updateMusicModal').showModal();
                                                    document.getElementById('updateMusicModal').querySelector('input[name="musicId"]').value = music._id;
                                                    document.getElementById('updateMusicModal').querySelector('input[name="musicName"]').value = music.name;
                                                    document.getElementById('updateMusicModal').querySelector('input[name="musicLink"]').value = music.link;
                                                }} className="cursor-pointer">Edit</a>
                                            </li>
                                            <li>
                                                <a onClick={() => {
                                                    document.getElementById('removeMusicModal').showModal();
                                                    document.getElementById('removeMusicModal').querySelector('input[name="musicId"]').value = music._id;
                                                }} className="cursor-pointer">Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                ) : null
                            }
                        </div>
                    ))
                    : null}
            </div>

            {musicList && musicList.length == 0 ? (
                <div className="flex flex-col justify-center items-center h-[calc(100vh-130px)]">
                    <div className="-mt-[90px] flex flex-col items-center">
                        <img
                            className="w-[60px] opacity-[50%] hue-rotate-[120deg]"
                            src="https://cdn-icons-png.flaticon.com/128/7486/7486820.png"
                            alt=""
                        />
                        <h1 className="text-rose-400">No Musics Found!</h1>
                    </div>
                </div>
            ) : null}

            {isLoading ? (
                <CustomLoader />
            ) : null}

            {
                user && user.role == 'admin' ? (
                    <>
                        <AddMusicModal popup_id="addMusicModal" funcName={addMusic} />
                        <UpdateMusicModal popup_id="updateMusicModal" funcName={updateMusic} />
                        <RemoveMusicModal popup_id="removeMusicModal" funcName={deleteMusic} />

                        <div onClick={() => document.getElementById('addMusicModal').showModal()} className="absolute bottom-[20px] right-[10px] bg-pink-600/80 backdrop-blur border-[1px] border-white/20 rounded-[18px] p-4 shadow-md shadow-gray-700/10 cursor-pointer">
                            <i className="fas fa-plus font-bold text-white text-[20px]"></i>
                        </div>
                    </>
                ) : null
            }
        </div>
    )
}
