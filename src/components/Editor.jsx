import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-xcode";

const codeTemplate = 
`#include <iostream>

using namespace std;

int main() {
    cout << "Hello, world!" << endl;
    return 0;
}`;

function onChange(newValue) {
  console.log("change", newValue);
}

function Editor() {
  return (
    <AceEditor
      value={codeTemplate}
      width="100vw"
      height="96vh"
      mode="c_cpp"
      theme="xcode"
      onChange={onChange}
      name="editor"
      editorProps={{ $blockScrolling: true }}
      fontSize="16px"
    />
  );
}

export default Editor;
