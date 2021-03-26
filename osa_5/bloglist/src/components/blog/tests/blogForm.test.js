import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "../blogForm";

describe("BlogForm component", () => {

  test("calls submit handler with correct values", () => {
    const blogToCreate = {
      title: "test title",
      author: "test author",
      url: "test url"
    };

    const createBlogHandler = jest.fn();

    const component = render(
      <BlogForm handleCreation={createBlogHandler} />
    );

    const form = component.container.querySelector("form");
    const titleInput = component.container.querySelector("input[name=title]");
    const authorInput = component.container.querySelector("input[name=author]");
    const urlInput = component.container.querySelector("input[name=url]");

    fireEvent.change(titleInput, { target: { value: blogToCreate.title } });
    fireEvent.change(authorInput, { target: { value: blogToCreate.author } });
    fireEvent.change(urlInput, { target: { value: blogToCreate.url } });
    fireEvent.submit(form);

    const submittedData = createBlogHandler.mock.calls[0][0];

    expect(createBlogHandler.mock.calls).toHaveLength(1);
    expect(submittedData.title).toBe(blogToCreate.title);
    expect(submittedData.author).toBe(blogToCreate.author);
    expect(submittedData.url).toBe(blogToCreate.url);
  });

});