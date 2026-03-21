import "dotenv/config";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Server running running on http://127.0.0.1:${PORT}`);
});
