import React from "react";
import "./Game1.css";

function Profile() {

    const user = {
        name: "Satish",
        email: "satish@example.com",
        balance: 2500,
        gamesPlayed: 120,
        wins: 65,
        losses: 55,
        highestNumber: 90
    };

    return (
        <div className="profile">

            <div className="profile-card">

                <img
                    src="https://i.pravatar.cc/200"
                    alt="profile"
                    className="profile-image"
                />

                <h2>{user.name}</h2>

                <p>{user.email}</p>

                <div className="stats">

                    <div className="stat">
                        <h3>{user.balance}</h3>
                        <span>Coins</span>
                    </div>

                    <div className="stat">
                        <h3>{user.gamesPlayed}</h3>
                        <span>Games</span>
                    </div>

                    <div className="stat">
                        <h3>{user.wins}</h3>
                        <span>Wins</span>
                    </div>

                    <div className="stat">
                        <h3>{user.losses}</h3>
                        <span>Losses</span>
                    </div>

                    <div className="stat">
                        <h3>{user.highestNumber}</h3>
                        <span>Highest</span>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Profile;