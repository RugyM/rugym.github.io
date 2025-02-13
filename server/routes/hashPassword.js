import bcrypt from "bcrypt";

const newPassword = "Coldplayer1!"; // Change this to your desired password

const hashPassword = async () => {
    try {
        const hash = await bcrypt.hash(newPassword, 10);
        console.log("Hashed Password:", hash);
    } catch (err) {
        console.error("Error hashing password:", err);
    }
};

hashPassword();
