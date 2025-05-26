const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config(); // .env 파일 로드를 위해 추가

const app = express();
app.use(cors());
app.use(express.json());

// ❗️❗️❗️ 아래 디버깅 코드를 추가해주세요. ❗️❗️❗️
console.log("--- 현재 Node.js가 사용하는 환경 변수 ---");
console.log("PG_HOST:", process.env.PG_HOST);
console.log("PG_USER:", process.env.PG_USER);
console.log("PG_PASSWORD:", process.env.PG_PASSWORD);
console.log("PG_DATABASE:", process.env.PG_DATABASE);
console.log("PG_PORT:", process.env.PG_PORT);
console.log("-----------------------------------------");

// PostgreSQL 연결 설정 (환경 변수에서 읽어오기)
const pool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST, // docker-compose.yml의 서비스 이름 'postgres'
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT,
});

// ... (이하 API 로직은 동일) ...
app.post("/api/search", async (req, res) => {
	const { searchTerm } = req.body;
	try {
		const query =
			"INSERT INTO search_history (search_term, created_at) VALUES ($1, NOW())";
		await pool.query(query, [searchTerm]);
		res.status(200).json({ message: "검색어가 성공적으로 저장되었습니다." });
	} catch (error) {
		console.error("데이터베이스 오류:", error);
		res.status(500).json({ error: "검색어 저장 중 오류가 발생했습니다." });
	}
});

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});

// search_history 테이블 생성
const createTableQuery = `
CREATE TABLE IF NOT EXISTS search_history (
    id SERIAL PRIMARY KEY,
    search_term VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

pool
	.query(createTableQuery)
	.then(() => console.log("search_history 테이블이 성공적으로 생성되었습니다."))
	.catch((error) => console.error("테이블 생성 중 오류 발생:", error));
