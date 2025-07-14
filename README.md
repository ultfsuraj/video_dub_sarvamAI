## Demo Video Dubbing Tool

### Deployed Link [Sarvam AI Video Dubbing Tool](https://video-dub-sarvam-ai.vercel.app/)

This is a demo web app to simulate video dubbing from one language to another.

Videos are uploaded to [Cloudinary](https://console.cloudinary.com/) account.

NO Video Processing Yet. Events are handeled to simulate UI change, processing will be done later.

1. Responsive (landscape mode recommended)
2. Upload video (try Videos in DemoVideos folder (short vertical, long horizontal))
3. Wait for video to be processed (language detection , transcript loading , audio extraction , translation loading , dubbed audio loading)
4. You can change dub language, drag and adjust dubbed audio clips

## Run in Local

```bash
# clone this repo
#
# go to project root directory

npm install

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## To Do

1. Redux integration (app has grown enough, useState isn't seamless ) for better state management and reduced Rerenders
2. SYNC slider, video, audio clips, dubbed texts, try using these for frequent updates

   a. Observers

   b. RequestAnimationFrame

3. IndexDB for storing audio clips & user updates on different dubbed languages (localStorage limit 5-10 MB)
4. backend apis + ZOD validations for audio processing, generation, translation, trimming, speed
5. Zoom on Audio Clips for precise control over editing
6. Worst usecases for performance bottlenecks
7. Authentication
