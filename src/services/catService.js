//this file is the service layer for the cat images API

const catNames = ['Whiskers', 'Mittens', 'Shadow', 'Luna', 'Bella', 'Charlie', 'Max', 'Lucy', 'Oliver', 'Sophie', 'Tiger', 'Nala', 'Simba', 'Cleo', 'Leo'];

// Preloading of images for better performance
const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    img.src = url;
  });
};

export const fetchCats = async (limit = 10) => {
    try {
        const response = await fetch(`https://cataas.com/api/cats?limit=${limit}&t=${Date.now()}`);
        if (!response.ok) throw new Error("Failed to fetch kittens");
        const data = await response.json();
        console.log("RAW DATA FROM API:", data[0]);

        //mapping the raw data to a cleaner format for the app
        const cats = data.map((cat, index) => ({
            id: cat.id,
            url: `https://cataas.com/cat/${cat.id}`,
            name: catNames[index % catNames.length],
            age: Math.floor(Math.random() * 10) + 1, // Random age 1-10
        }));

        // Preload only first 3 images for faster initial load
        const preloadPromises = cats.slice(0, 3).map(cat => preloadImage(cat.url));
        await Promise.allSettled(preloadPromises);

        return cats;
    } catch (error){
        console.error("Error while fetching data:", error);
        return [];

    }

};
