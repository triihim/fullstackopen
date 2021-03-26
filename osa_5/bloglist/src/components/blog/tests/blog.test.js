import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Blog from "../blog";

describe("Blog component", () => {

  const mockBlog = {
    id: 1,
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 5,
    user: {
      username: "testusername",
      name: "test user"
    }
  };

  beforeAll(() => {
    // Required by blog component since it uses loginService to check the logged in user before rendering the delete-button.
    window.localStorage.setItem("user", JSON.stringify({ username: mockBlog.user.username }));
  });

  afterAll(() => {
    window.localStorage.removeItem("user");
  });

  test("renders title and author but not url or likes by default", () => {
    const mockDeleteHandler = jest.fn();
    const mockLikeHandler = jest.fn();

    const component = render(
      <Blog blog={mockBlog} handleDelete={mockDeleteHandler} handleLike={mockLikeHandler} />
    );

    expect(component.container).toHaveTextContent(mockBlog.title);
    expect(component.container).toHaveTextContent(mockBlog.author);
    expect(component.container).not.toHaveTextContent(mockBlog.url);
    expect(component.container).not.toHaveTextContent("Likes");
  });

  test("renders title, author, url and likes when opened by clicking", () => {
    const mockDeleteHandler = jest.fn();
    const mockLikeHandler = jest.fn();

    const component = render(
      <Blog blog={mockBlog} handleDelete={mockDeleteHandler} handleLike={mockLikeHandler} />
    );

    const expandButton = component.getByText("Show");

    fireEvent.click(expandButton);

    expect(component.container).toHaveTextContent(mockBlog.title);
    expect(component.container).toHaveTextContent(mockBlog.author);
    expect(component.container).toHaveTextContent(mockBlog.url);
    expect(component.container).toHaveTextContent("Likes");
  });

  test("like button fires the event handler", () => {
    const mockDeleteHandler = jest.fn();
    const mockLikeHandler = jest.fn();

    const component = render(
      <Blog blog={mockBlog} handleDelete={mockDeleteHandler} handleLike={mockLikeHandler} />
    );

    const expandButton = component.getByText("Show");
    fireEvent.click(expandButton);

    const likeButton = component.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });

});