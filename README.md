## Todo List App

### Introduction

Todo List App is a simple web application built to manage daily tasks. The app allows you to add, edit,
delete tasks, and change their status from "Not Started" to "In Progress" and finally to "Completed".
You can also drag and drop tasks between stages.

### Features

- Add Note: You can add a new note by entering the content into the input field and clicking the "Add" button.
- Edit Note: You can edit a note by clicking on the note you want to edit, making changes, and then clicking "Save".
- Change Status: You can change the status of a task from "Not Started" to "In Progress" by dragging and dropping the task into the corresponding list or by clicking on the task and selecting a new status from the dropdown menu.
- Delete Note: You can delete a note by clicking on the delete icon or the "Delete" button.
- Drag and Drop Notes: You can drag and drop notes between the "Not Started", "In Progress", and "Completed" stages.

### Technologies Used

- NextJS: Typescript library for building user interfaces.
- SCSS: Advanced CSS preprocessor for managing the styling of the application.
- React Beautiful DND: React library for drag and drop functionality.

### Demo application

- https://todo-list-eight-red.vercel.app/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
