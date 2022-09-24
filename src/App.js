import MarkdownIt from "markdown-it";
import FileSaver from "file-saver";
import React, { useState } from "react";

function App() {
  let [markdownText, setMarkDownText] = useState("");

  let [renderedHTML, setRenderedHTML] = useState("");

  let [fileName, setFileName] = useState("untitled-note");

  function handleTextInput(e) {
    setMarkDownText(e.target.value);

    let md = new MarkdownIt();

    let renderedHTML = md.render(e.target.value);

    setRenderedHTML(renderedHTML);
  }

  function saveHTML() {
    let blobFile = new Blob([renderedHTML], {
      type: "text/html",
    });

    FileSaver.saveAs(blobFile, fileName);
  }

  function saveMarkdown() {
    let blobFile = new Blob([markdownText], {
      type: "text",
    });

    FileSaver.saveAs(blobFile, fileName);
  }
  return (
    <div className="App">
      <div className="container">
        <textarea
          placeholder="Markdown..."
          className="textarea"
          rows={20}
          value={markdownText}
          onChange={handleTextInput}
        ></textarea>
        <div className="output">
          <div
            // Change the HTML to be displayed according
            // to the render produced by MarkdownIt
            dangerouslySetInnerHTML={{ __html: renderedHTML }}
            className="rendered-html-output"
          ></div>
        </div>
      </div>
      <br />
      <div className="control">
        <input
          type="text"
          className="fileName"
          aria-label="File Name"
          placeholder="File Name"
          value={fileName}
          onChange={(fname) => setFileName(fname.target.value)}
        />
        <button className="button" type="button" onClick={saveMarkdown}>
          Save Markdown
        </button>
        <button className="button" type="button" onClick={saveHTML}>
          Save HTML
        </button>
      </div>
    </div>
  );
}

export default App;
