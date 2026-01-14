//this file is the service layer for the cat images API

export const fetchCats = async (limit = 15) => {
    try {
        const response = await fetch(`https://cataas.com/api/cats?limit=${limit}&t=${Date.now()}`);
        if (!response.ok) throw new Error("Failed to fetch kittens");
        const data = await response.json();
        console.log("RAW DATA FROM API:", data[0]);

        //mapping the raw data to a cleaner format for the app
        return data.map((cat) => ({
            id: cat.id,
            url: `https://cataas.com/cat/${cat.id}`,
        }));
    } catch (error){
        console.error("Error while fetching data:", error);
        return [];
    }

};
