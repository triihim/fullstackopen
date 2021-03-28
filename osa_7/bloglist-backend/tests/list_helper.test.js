const listHelper = require("../src/utils/list_helper");

describe("total likes", () => {
  const listWithOneBlog = [
    {
      title: "Test blog 1",
      author: "Test author 1",
      url: "http://google.com",
      likes: 5
    }
  ];

  const listWithMultipleBlogs = [
    {
      title: "Test blog 1",
      author: "Test author 1",
      url: "http://google.com",
      likes: 2,
    },
    {
      title: "Test blog 2",
      author: "Test author 2",
      url: "http://google.com",
      likes: 8,
    }
  ];

  test("empty blog list sums to 0 likes", () => {
    const result = listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("multiple blogs sum the likes", () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs);
    expect(result).toBe(10);
  });
});

describe("favorite blog", () => {
  const blogs = [
    {
      title: "Test blog 1",
      author: "Test author 1",
      url: "http://google.com",
      likes: 2,
    },
    {
      title: "Test blog 2",
      author: "Test author 2",
      url: "http://google.com",
      likes: 8,
    },
    {
      title: "Test blog 3",
      author: "Test author 3",
      url: "http://google.com",
      likes: 5,
    }
  ];

  test("find blog with most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    expect(result).toEqual(blogs[1]);
  });
  
});

describe("most blogs", () => {
  const blogs = [
    {
      title: "Test blog 1",
      author: "Test author 1",
      url: "http://google.com",
      likes: 2,
    },
    {
      title: "Test blog 2",
      author: "Busy author",
      url: "http://google.com",
      likes: 8,
    },
    {
      title: "Test blog 3",
      author: "Busy author",
      url: "http://google.com",
      likes: 5,
    },
    {
      title: "Test blog 4",
      author: "Test author 3",
      url: "http://google.com",
      likes: 5,
    }
  ];

  test("find author with most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    expect(result).toBe("Busy author");
  });
  
});

describe("most liked author", () => {
  const blogs = [
    {
      title: "Test blog 1",
      author: "Test author 1",
      url: "http://google.com",
      likes: 2,
    },
    {
      title: "Test blog 2",
      author: "Busy author",
      url: "http://google.com",
      likes: 8,
    },
    {
      title: "Test blog 3",
      author: "Busy author",
      url: "http://google.com",
      likes: 5,
    },
    {
      title: "Test blog 4",
      author: "Test author 3",
      url: "http://google.com",
      likes: 5,
    }
  ];

  test("find author with most likes in total", () => {
    const result = listHelper.mostLikes(blogs);
    expect(result.author).toBe("Busy author");
    expect(result.likes).toBe(13);
  });
});