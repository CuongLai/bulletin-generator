import * as axios from 'axios';

export default async function generate(text) {
    console.log(text);
    const res = await axios.post('http://localhost:3001/generate', {
        frontCoverText: text,
    });
    console.log(res);
}
