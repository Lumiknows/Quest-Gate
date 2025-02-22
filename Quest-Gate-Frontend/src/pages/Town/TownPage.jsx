import styles from './TownPage.module.css'
import avatar from '../../assets/Town/Profile view main Character.png'
import attack from '../../assets/Town/Attack bar.png'
import defense from '../../assets/Town/Defense Bar.png'
import health from '../../assets/Town/Health bar.png'
import character from '../../assets/Town/Anime Character.png'
import academia from '../../assets/Town/academia-removebg-preview.png'
import story from '../../assets/Town/Story_Button-removebg-preview.png'
import quests from '../../assets/Town/Quests_Button-removebg-preview.png'
import shop from '../../assets/Town/Shop_Button-removebg-preview.png'
import coin from '../../assets/Town/coins.png'
import { Link } from 'react-router-dom'
import { useAvatar } from '../../hooks/AvatarContext';
import { useEffect, useState } from 'react'
import axios from 'axios'

function TownPage() {
    const { avatarId } = useAvatar();
    const [avatarData, setAvatarData] = useState(null); // State to store fetched avatar data

    useEffect(() => {
        console.log("Avatar ID:", avatarId);

        const getAvatarData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/api/getAvatarData', {
                    avatarId: avatarId
                });
                console.log(response.data);
                setAvatarData(response.data); // Store data in state
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        if (avatarId) { // Only fetch if avatarId is available
            getAvatarData();
        }
    }, [avatarId]);

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.avatarcon}>
                    <p>{avatarData ? avatarData.avatar_name : "Loading..."}</p>
                    <img src={avatar} alt="running" className={styles.avatar} />
                </div>
                <div className={styles.texts}>
                    <p>Attack: {avatarData ? avatarData.attack : "Loading..."}</p>
                    <img src={attack} alt="attack" className={styles.stats} />
                    <p>Defense: {avatarData ? avatarData.defense : "Loading..."}</p>
                    <img src={defense} alt="defense" className={styles.stats} />
                    <p>Health: {avatarData ? avatarData.health : "Loading..."}</p>
                    <img src={health} alt="health" className={styles.stats} />
                    <p>Level: {avatarData ? avatarData.level : "Loading..."}</p>
                </div>
            </div>
            <img src={character} alt="health" className={styles.anime} />
            <Link to="/academia"><img src={academia} alt="academia" className={styles.academia} /></Link>
            <img src={story} alt="story" className={styles.story} />
            <Link to="/"><img src={quests} alt="quests" className={styles.quests} /></Link>
            <Link to="/shop"><img src={shop} alt="shop" className={styles.shop} /></Link>
            <div className={styles.coinslot}>
                <img src={coin} alt="coin" className={styles.coin} />
                <p>{avatarData ? avatarData.coins : "Loading..."}</p>
            </div>
        </div>
    );
}

export default TownPage;
