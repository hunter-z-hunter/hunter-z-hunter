## Getting Started

To install dependencies:

```bash
# at root
yarn install
# for python image service
cd packages/backend/image-service
pip install -r requirements.txt
```

To run the nextjs app:
```bash
cd packages/frontend
yarn dev
```

or with Docker
```bash
cd packages/frontend
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```

Open [http://localhost:3000](http://localhost:3000)
