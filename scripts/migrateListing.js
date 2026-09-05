//Purpose: TO clean data i.e add geometry to listing which does not or is empty
const mongoose = require("mongoose");
const axios = require("axios");
const Listing = require("../models/Listing");

const DB_URL ='mongodb://127.0.0.1:27017/airbnb';

async function geocodeLocation(location) {

    const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
            params: {
                q: `${location}, India`,
                format: "jsonv2",
                limit: 1
            },
            headers: {
                "User-Agent": "WanderLust/1.0"
            }
        }
    );

    if (response.data.length === 0) {
        return null;
    }

    const result = response.data[0];

    return {
        type: "Point",
        coordinates: [
            Number(result.lon),
            Number(result.lat)
        ]
    };
}

async function migrate() {

    try {

        await mongoose.connect(DB_URL);
        console.log("Connected to MongoDB");

        // Find listings where geometry is missing OR empty
        const listings = await Listing.find({
            $or: [
                { geometry: { $exists: false } },
                { "geometry.coordinates": { $exists: false } },
                { "geometry.coordinates": { $size: 0 } }
            ]
        });

        console.log(`Found ${listings.length} listings to migrate`);

        for (const listing of listings) {

            console.log(`Geocoding: ${listing.location}`);

            try {

                const geometry = await geocodeLocation(listing.location);

                if (!geometry) {
                    console.log(`❌ Could not find: ${listing.location}`);
                } else {

                    await Listing.updateOne(
                        { _id: listing._id },
                        {
                            $set: {
                                geometry: geometry
                            }
                        }
                    );

                    console.log(
                        `✅ Updated: ${listing.location} ->`,
                        geometry.coordinates
                    );
                }

            } catch (err) {

                console.log(
                    `❌ Error geocoding ${listing.location}:`,
                    err.message
                );
            }

            // Nominatim public API: keep requests at least ~1 second apart
            await new Promise(resolve => setTimeout(resolve, 1100));
        }

        console.log("Migration completed");

    } catch (err) {

        console.error("Migration failed:", err);

    } finally {

        await mongoose.connection.close();
        console.log("MongoDB connection closed");
    }
}

migrate();