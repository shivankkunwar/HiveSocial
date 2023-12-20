describe("End to end test", () => {
  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("renders the SignInForm", () => {
    cy.get('input[name="email"]').should("exist");
    cy.get('input[name="password"]').should("exist");
    cy.get('button[name="login"]').should("exist");
  });
  it("accepts input in email and password fields", () => {
    cy.get('input[name="email"]')
      .type("test@test.com")
      .should("have.value", "test@test.com");
    cy.get('input[name="password"]')
      .type("password")
      .should("have.value", "password");
  });

  it("submits the form and navigates to home page on successful login", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.url().should("include", "/home");
  });

  it("displays an error message on failed login", () => {
    cy.get('input[name="email"]').type("wrong@test.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[type="submit"]').click();
    cy.contains("Failed to log in.").should("exist");
  });
  it("submits the form and navigates to sidebar menus on click", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
    cy.contains("My Likes").click();
    cy.url().should("include", "/my-likes");
    cy.contains("My Bookmarks").click();
    cy.url().should("include", "/my-bookmarks");
    cy.contains("My Posts").click();
    cy.url().should("include", "/my-posts");
    cy.contains("My Profile").click();
    cy.url().should("include", "/my-profile");
  });

  it("testing the functionality to add post and comments", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("password");

    //testing adding post
    cy.get('button[type="submit"]').click();
    cy.get('textarea[name="content"]').type("testing post functionality");
    cy.get('button[type="submit"]').click();
    cy.contains("testing post functionality");
    cy.get('span[aria-label="comment"]').first().click({ multiple: true });
    cy.get('textarea[name="comment"]').type("This is a test comment");
    cy.get('button[name="submitComment"]').click();
    cy.contains("This is a test comment").should("exist");
    //testing deletion of post
    cy.contains("Delete").should("exist").click();
    cy.contains("Yes").click();
    cy.contains("This is an edited comment").should("not.exist");
    // testing editing of post

    cy.get('textarea[name="comment"]').type("This is a test comment");
    cy.get('button[name="submitComment"]').click();
    cy.contains("Edit").click();
    cy.get("Input").clear().type("This is an edited post");
    cy.contains("update").click();
    cy.contains("Yes").click();
    cy.contains("This is an edited post").should("exist");
  });

  it("testing likes functionality", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
   
    cy.get('span[aria-label="like"]').first().click({ multiple: true });
    cy.contains("My Likes").click();
    cy.contains("This is a post by Alice.").should("exist");
   
  });
  
  it("testing bookmarks functionality", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
   
    cy.get('span[aria-label="book"]').first().click({ multiple: true });
    cy.contains("My Bookmarks").click();
    cy.contains("This is a post by Alice.").should("exist");
   
  });
  it("testing my post  functionality", () => {
    cy.get('input[name="email"]').type("test@test.com");
    cy.get('input[name="password"]').type("password");
    cy.get('button[type="submit"]').click();
   
    
    cy.contains("My Posts").click();
    cy.get('button[aria-label="展开行"]').first().click({ multiple: true });
    cy.contains("Sunsets are my favorite too!").should("exist");
   
  });
});
