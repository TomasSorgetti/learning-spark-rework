/**
 * Validates a specific field of a post form based on its name and value.
 *
 * @param {string} name - The name of the field to validate (e.g., "title", "content", "image").
 * @param {string|File|null} value - The value of the field to validate. Can be a string, a File object (for "image"), or null.
 * @returns {string} - An error message if validation fails, or an empty string if the field is valid.
 */
export const ValidatePost = (name, value) => {
  switch (name) {
    case "title":
      if (!value.trim()) return "Title is required";
      if (value.length < 10) return "Title must be at least 10 characters long";
      return "";

    case "content":
      const normalizedValue = value.replace(/[\r\n\t]+/g, " ").trim();
      if (!value.trim()) return "Content is required";
      else if (
        /<script/i.test(normalizedValue) ||
        /&lt;script/i.test(normalizedValue)
      )
        return "What are you trying to do my friend? I am watching you!";
      else if (value.length < 100)
        return "Content must be at least 100 characters long";
      return "";

    case "image":
      if (value === null) return "Image is required";
      return "";

    case "url":
      if (!value.trim()) return "Url is required";
      if (value.includes(" ")) return "Url must not contain spaces";
      if (value.includes("_")) return "Url must not contain underscores";
      if (/[A-Z]/.test(value)) return "Url must not contain uppercase letters";
      return "";

    case "author":
      if (!value.trim()) return "Author is required";
      return "";

    case "tags":
      if (!value.trim()) return "Tags are required";
      const tags = value.split(",").map((tag) => tag.trim());
      if (tags.length < 3) return "At least 3 tags are required";
      for (let i = 0; i < tags.length; i++) {
        if (tags[i][0] !== "#") return "Each tag must start with #";
        else if (tags[i].length < 4)
          return "Each tag must be at least 3 characters long";
      }
      return "";

    case "subject":
      if (!value.trim()) return "subject is required";
      return "";

    default:
      return "";
  }
};

/**
 * Validates an entire post form and returns an object with errors for each field.
 *
 * @param {Object} form - The form object containing the field values.
 * @param {string} form.title - The title of the post.
 * @param {string} form.content - The content of the post.
 * @param {File|null} form.image - The selected image file or null.
 * @param {string} form.url - The URL of the post.
 * @param {string} form.author - The author of the post.
 * @param {string} form.tags - The tags of the post.
 * @returns {Object} - An object with error messages for each field. If a field is valid, its error value is an empty string.
 */
export const validatePostForm = (form) => {
  const newErrors = {
    title: ValidatePost("title", form.title),
    content: ValidatePost("content", form.content),
    image: ValidatePost("image", form.image),
    url: ValidatePost("url", form.url),
    author: ValidatePost("author", form.author),
    tags: ValidatePost("tags", form.tags),
    subject: ValidatePost("subject", form.subject),
  };

  return newErrors;
};
