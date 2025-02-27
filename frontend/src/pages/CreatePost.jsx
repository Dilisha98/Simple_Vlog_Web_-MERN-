import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    data.set('title', title);
    data.set('description', description);
    data.set('image', image);
    event.preventDefault();
    const response = await fetch('http://localhost:5000/post',{
      method: 'POST',
      body:data,
    });
    if (response.ok) {
      setRedirect(true);
    }
  };
  if (redirect) {
    return<Navigate t0={'/'} />
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center mx-auto md:h-screen p-6">
      <div className="max-w-lg w-full p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Create New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title Field */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter post title"
              required
            />
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter post description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              Upload Image
            </label>
            <input
              type="file"
              value={image}
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-2 bg-gray-100 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
