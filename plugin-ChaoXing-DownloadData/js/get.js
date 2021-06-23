const $titles = document.querySelectorAll(".TiMu");
const $qTItle = document.querySelector(".Cy_TItle");

const answerObj = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6
};

const judgeObj = {
    "√": "对",
    "×": "错"
}

const dataList = [
    ['题目', '正确答案', '答案描述']
];

// ChaoXing 作业和 ChaoXing 考试的页面元素类名不一致, 例如 作业->Zy | 考试->Cy
const models = {
    "EXAM": ".Cy",
    "HOMEWORK": ".Zy"
}

let model = ($qTItle == null) ? models["HOMEWORK"] : models["EXAM"];

function exportSpecialExcel(aoa) {
    let sheet = XLSX.utils.aoa_to_sheet(aoa);
    // sheet['!merges'] = [
    //     // 设置A1-C1的单元格合并
    //     {s: {r: 0, c: 0}, e: {r: 0, c: 2}}
    // ];
    openDownloadDialog(sheet2blob(sheet), 'ChaoXing作业数据.xlsx');
}

/**
 * 通用的打开下载对话框方法，没有测试过具体兼容性
 * @param url 下载地址，也可以是一个blob对象，必选
 * @param saveName 保存文件名，可选
 */
function openDownloadDialog(url, saveName) {
    if (typeof url == 'object' && url instanceof Blob) {
        url = URL.createObjectURL(url); // 创建blob地址
    }
    let aLink = document.createElement('a');
    aLink.href = url;
    aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    let event;
    if (window.MouseEvent) event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
function sheet2blob(sheet, sheetName) {
    sheetName = sheetName || 'sheet1';
    let workbook = {
        SheetNames: [sheetName],
        Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    let wopts = {
        bookType: 'xlsx', // 要生成的文件类型
        bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
        type: 'binary'
    };
    let wbout = XLSX.write(workbook, wopts);
    let blob = new Blob([s2ab(wbout)], {type: "application/octet-stream"});

    // 字符串转ArrayBuffer
    function s2ab(s) {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    return blob;
}

function getAnswer() {
    for (let $title of $titles) {
        let $answerMain = $title.querySelector(".Py_answer>span");
        let $answerOther = $title.querySelector(".Py_tk>div");
        let answer = ($answerOther == null) ? $answerMain.innerText : $answerOther.innerText;

        getAnswerDesc($title, answer);
    }
}

function getAnswerDesc($title, answer) {
    let answerDesc = "";
    let title = $title.querySelector(model + "_TItle>div").innerText;

    let $answerCompletion = $title.querySelector(".Py_tk");

    let ChooseDescArray = getChooseDesc(answer);

    if (ChooseDescArray.length > 0) {
        for (let answerDescArrayElement of ChooseDescArray) {
            let _desc1 = $title.querySelectorAll(model + "_ulTop li>i")[answerDescArrayElement].innerText;
            let _desc2 = $title.querySelectorAll(model + "_ulTop li a")[answerDescArrayElement].innerText;
            answerDesc += _desc1 + _desc2 + "      ";
        }
    } else if ($answerCompletion == null) {
        for (let judgeObjKey in judgeObj) {
            if ($title.querySelector(".Py_answer>span>i").innerText === judgeObjKey) {
                answer = judgeObjKey;
                answerDesc = judgeObj[judgeObjKey]
            }
        }
    }
    dataList.push([
        title, answer, answerDesc
    ])
}

function getChooseDesc(answer) {
    let answerArr = [];

    for (let answerObjKey in answerObj) {
        if (answer.indexOf(answerObjKey) !== -1) {
            answerArr.push(answerObj[answerObjKey]);
        }
    }

    return answerArr;
}

getAnswer();
exportSpecialExcel(dataList);