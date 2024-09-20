# Text Diff

Text Diff is a simple, user-friendly one-page web application that allows users to compare two pieces of text and identify their differences. Whether you're proofreading documents, comparing code snippets, or analyzing textual content, Text Diff provides an intuitive interface to highlight discrepancies efficiently.

🔗 **Try it out [here](https://rzagreb.github.io/text-diff).**

## Privacy

Your privacy is respected. Text Diff does not store or share your data. All processing is done locally in your browser.

## Contributing

Contributions are welcome! Although this repository is primarily for hosting the GitHub Pages site, you can still contribute to improve the tool.

1. **Fork the Repository**

   Click the [Fork](https://github.com/rzagreb/text-diff/fork) button at the top right of the repository page.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/your-username/text-diff.git
   ```

3. **Create a New Branch**

   ```bash
   git checkout -b feature/YourFeatureName
   ```

4. **Make Your Changes**

   Implement your feature or bug fix.

5. **Commit Your Changes**

   ```bash
   git commit -m "Add feature: YourFeatureName"
   ```

6. **Push to Your Fork**

   ```bash
   git push origin feature/YourFeatureName
   ```

7. **Open a Pull Request**

   Navigate to the original repository and open a pull request with a description of your changes.

## Advanced Usage

### Pre-Populate Texts via URL

Text Diff can automatically fill text areas using the `q` URL parameter, separating texts with `|||`. For example:

```
https://rzagreb.github.io/text-diff?q=Hello%20World%20|||Hello%20Universe
```

### Add as a Custom Search Engine in Chrome

1. **Open Chrome Settings** > **Search engine** > **Manage search engines**.
2. **Add a new search engine**:
   - **Name:** Text Diff
   - **Keyword:** `diff`
   - **URL:** `https://rzagreb.github.io/text-diff?q=%s`
3. **Use it** by typing `diff` followed by your texts separated by `|||` in the address bar, e.g., `diff Hello World ||| Hello Universe`.
