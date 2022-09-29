import MarkdownIt from "markdown-it";
import FileSaver from "file-saver";
import React, { useState, useRef } from "react";

function App() {
  const inputRef = useRef(null);

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
  const handleClick = () => {
    inputRef.current.click();
  };
  function getFile(event) {
    const input = event.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(
        document.getElementById("content-target"),
        input.files[0]
      );
    }
  }

  function placeFileContent(target, file) {
    readFileContent(file)
      .then((content) => {
        target.value = content;
      })
      .catch((error) => console.log(error));
  }

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }
  function bold() {
    setMarkDownText("**Scribere**");
  }
  function italic() {
    setMarkDownText("*Scribere*");
  }
  function first() {
    setMarkDownText("# Scribere");
  }
  function scnd() {
    setMarkDownText("## Scribere");
  }
  function third() {
    setMarkDownText("### Scribere");
  }
  function four() {
    setMarkDownText("#### Scribere");
  }
  function five() {
    setMarkDownText("##### Scribere");
  }
  function six() {
    setMarkDownText("###### Scribere");
  }
  function link() {
    setMarkDownText("[link](https://github.com/MaelDevFr)");
  }
  function list() {
    setMarkDownText("- Scribere\n- MaelDevFr");
  }
  function img() {
    setMarkDownText("![Img](img.png)");
  }
  function barred() {
    setMarkDownText("~~Scribere~~");
  }
  function array() {
    setMarkDownText(
      "|cellule 1|cellule 2|\n|--------|--------|\n|    A    |    B    |"
    );
  }
  function lineBreak(e) {
    setMarkDownText(markdownText + "   \n");
  }
  return (
    <div className="App">
      <div className="edit">
        <button onClick={bold} className="button-edit-markdown">
          Bold
        </button>
        <button onClick={italic} className="button-edit-markdown">
          Italic
        </button>
        <button onClick={first} className="button-edit-markdown">
          1st Title
        </button>
        <button onClick={scnd} className="button-edit-markdown">
          2nd Title
        </button>
        <button onClick={third} className="button-edit-markdown">
          3rd Title
        </button>
        <button onClick={four} className="button-edit-markdown">
          4th Title
        </button>
        <button onClick={five} className="button-edit-markdown">
          5th Title
        </button>
        <button onClick={six} className="button-edit-markdown">
          6th Title
        </button>
        <button onClick={link} className="button-edit-markdown">
          Link
        </button>
        <button onClick={list} className="button-edit-markdown">
          List
        </button>
        <button onClick={img} className="button-edit-markdown">
          Img
        </button>
        <button onClick={barred} className="button-edit-markdown">
          Barred
        </button>
        <button onClick={array} className="button-edit-markdown">
          Array
        </button>
        <button onClick={lineBreak} className="button-edit-markdown">
          LineBreak
        </button>
      </div>
      <br />
      <div className="infos">
        <p>
          Letters : {markdownText.length} | Words :{" "}
          {markdownText.split(" ").length} | Special Characters :{" "}
          {markdownText.replace(/[a-zA-Z0-9 ]/g, "").length}
        </p>
      </div>
      <div className="container">
        <textarea
          placeholder="Markdown..."
          className="textarea"
          rows={20}
          value={markdownText}
          id="content-target"
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
        <input
          style={{ background: "transparent", display: "none" }}
          ref={inputRef}
          type="file"
          id="input-file"
          onChange={(event) => getFile(event)}
          accept=".txt, .md"
        />
        <button className="button" onClick={handleClick}>
          Open file
        </button>
      </div>
    </div>
  );
}

export default App;
