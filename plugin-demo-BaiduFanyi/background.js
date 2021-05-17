let BaiduFanyi = {
    type: "normal",
    title: "Baidu 翻译",
    contexts: ["selection", "link"],
    onclick: function (info) {
        window.open("https://fanyi.baidu.com/#zh/en/" + info.selectionText);
    }
};

chrome.contextMenus.create(BaiduFanyi, function () {
});
