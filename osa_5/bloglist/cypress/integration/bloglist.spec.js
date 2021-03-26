const user = {
  name: "Test User",
  username: "testuser",
  password: "test1234"
};

const testBlog = {
  title: "Test title",
  author: "Test author",
  url: "http://test.com/"
};

describe("bloglist", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users", user);
    cy.visit("http://localhost:3000/");
  });

  it("Login form is shown", function() {
    cy.contains("Login");
  });

  describe("Login", function() {

    it("Is successful with correct credentials", function() {
      cy.get("input[name=username]").type(user.username);
      cy.get("input[name=password]").type(user.password);
      cy.get("#loginButton").click();
      cy.contains(`${user.name} logged in`);
    });

    it("Is unsuccessful with incorrect credentials", function() {
      cy.get("input[name=username]").type("wrong");
      cy.get("input[name=password]").type("wrong");
      cy.get("#loginButton").click();
      cy.get(".notification")
        .should("contain", "Invalid login credentials")
        .and("have.css", "color", "rgb(255, 0, 0)");
    });

  });

  describe("When logged in", function() {
    beforeEach(function() {
      cy.request("POST", "http://localhost:3003/api/login", user).then(res => window.localStorage.setItem("user", JSON.stringify(res.body)));
      cy.visit("http://localhost:3000");
    });

    it("New blog can be created", function() {
      cy.contains("New blog").click();
      cy.get("input[name=title]").type(testBlog.title);
      cy.get("input[name=author]").type(testBlog.author);
      cy.get("input[name=url]").type(testBlog.url);
      cy.get("#submitBlogButton").click();

      cy.get(".notification")
        .should("contain", testBlog.title)
        .and("have.css", "color", "rgb(0, 128, 0)");

      cy.contains(`${testBlog.title}, by ${testBlog.author}`);
    });

    describe("and blog exists", function() {
      beforeEach(function() {
        cy.createBlog(testBlog);
      });

      it("Blog can be liked", function() {
        cy.contains("Show").click();
        cy.contains("Like").click();
        cy.get(".blogLikes").contains("1");
      });

      it("Blog can be deleted", function() {
        cy.contains("Show").click();
        cy.contains("Remove").click();
        cy.wait(500);
        cy.get(".notification").should("contain", `${testBlog.title} deleted`);
      });
    });

  });

  describe("and multiple blogs exist", function() {
    const blogs = [
      {
        title: "Title 1",
        author: "Author 1",
        url: "Url 1"
      },
      {
        title: "Title 2",
        author: "Author 2",
        url: "Url 2"
      },
      {
        title: "Title 3",
        author: "Author 3",
        url: "Url 3"
      }
    ];

    beforeEach(function() {
      cy.request("POST", "http://localhost:3003/api/login", user).then(res => window.localStorage.setItem("user", JSON.stringify(res.body)));
      blogs.forEach(function(b) { cy.createBlog(b); });
      cy.visit("http://localhost:3000");
    });

    it("blogs are sorted by likes", function() {
      cy.get(".blog").each(function(blog) {
        cy.wrap(blog).contains("Show").click();
      });

      // Give the three blogs 0, 1 and 2 likes.
      cy.get(".blog").each(function(blog, index) {
        for(let i = 0; i < index; i++) {
          cy.wrap(blog).contains("Like").click();
          cy.wait(300);
        }
      });

      cy.get(".blog").each(function(blog, index) {
        for(let i = 0; i <= index; i++) {
          cy.wrap(blog).get(".blogLikes").contains(index.toString());
        }
      });

    });

  });

});