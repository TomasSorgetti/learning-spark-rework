export const ValidatePost = (name, value) => {
  switch (name) {
    case "title":
      if (!value.trim()) return "Title is required";
      if (value.length < 10) return "Title must be at least 10 characters long";
      return "";

    case "content":
      if (!value.trim()) return "Content is required";
      if (value.length < 100)
        return "Content must be at least 100 characters long";
      return "";

    case "image":
      if (!value.trim()) return "Image is required";
      return "";

    case "url":
      if (!value.trim()) return "Url is required";
      return "";

    case "author":
      if (!value.trim()) return "Author is required";
      return "";

    case "tags":
      if (!value.trim()) return "Tags is required";
      return "";

    // case "subject":
    //   if (!value.trim()) return "subject is required";
    //   return "";

    default:
      return "";
  }
};

export const validatePostForm = (form) => {
  const newErrors = {
    title: ValidatePost("title", form.title),
    content: ValidatePost("content", form.content),
    image: ValidatePost("image", form.image),
    url: ValidatePost("url", form.url),
    author: ValidatePost("author", form.author),
    tags: ValidatePost("tags", form.tags),
    // subject: ValidatePost("subject", form.subject),
  };

  return newErrors;
};
