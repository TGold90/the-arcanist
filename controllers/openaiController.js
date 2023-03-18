const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {
    try {
        const response = await openai.generateImage({
            prompt: "3 tarot cards combined to create a new image",
            n: 1,
            size: '512x512'
        });

        const imageUrl = response.data.data[0].url

        res.status(200).json({
            success: true,
            data: imageUrl
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Something went wrong'
        });
    }
}

module.exports = { generateImage }