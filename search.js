document.addEventListener("DOMContentLoaded", () => {
	const searchInput = document.getElementById("searchInput");
	const searchButton = document.getElementById("searchButton");

	searchButton.addEventListener("click", async () => {
		const searchTerm = searchInput.value.trim();

		if (searchTerm) {
			try {
				const response = await fetch("http://localhost:3000/api/search", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ searchTerm }),
				});

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				console.log("검색어가 성공적으로 저장되었습니다.");
				searchInput.value = ""; // 입력 필드 초기화
			} catch (error) {
				console.error("검색어 저장 중 오류 발생:", error);
			}
		}
	});
});
