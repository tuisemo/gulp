define(["jquery","脚本WebUploader"],function(i,e){var n,t=window.devicePixelRatio||1,o=200*t,a=200*t;$(".upload_container").on("click",".uploadBtn",function(){n=$(this).attr("id"),$curList=$("#"+n+"List")}),$(".upload_container").on("click","object",function(){n=$(this).parent(".uploadBtn").attr("id"),$curList=$("#"+n+"List")});var d=e.create({auto:!0,method:"POST",swf:"../css/Uploader.swf",server:"../upload",pick:{id:"#ZM_Picker",innerHTML:"上传证件照正面",multiple:!1},accept:{title:"Images",extensions:"gif,jpg,jpeg,bmp,png",mimeTypes:"image/jpg,image/jpeg,image/png"},fileSingleSizeLimit:2048e3,thumb:{width:110,height:110,quality:70,allowMagnify:!0,crop:!0,type:"image/jpeg"},resize:!1});d.addButton({id:"#FM_Picker",innerHTML:"上传证件照反面",multiple:!1}),d.addButton({id:"#SC_Picker",innerHTML:"上传手持证件照",multiple:!1}),d.on("fileQueued",function(i){var e=$('<div id="'+i.id+'" class="file-item thumbnail"><img><div class="info">'+i.name+"</div></div>"),n=e.find("img");$curList.append(e),d.makeThumb(i,function(i,e){if(i)return void n.replaceWith("<span>不能预览</span>");n.attr("src",e)},o,a)}),d.on("beforeFileQueued",function(i){var e=this;if(i.size>e.options.fileSingleSizeLimit)return console.log("文件过大"),!1}),d.on("uploadProgress",function(i,e){var n=$("#"+i.id),t=n.find(".webuploader-progress span");t.length||(t=$('<p class="webuploader-progress"><span></span></p>').appendTo(n).find("span")),t.css("width",100*e+"%")}),d.on("uploadSuccess",function(i){$("#"+i.id).addClass("upload-state-done")}),d.on("uploadError",function(i){var e=$("#"+i.id),n=e.find("div.error");n.length||(n=$('<div class="error"></div>').appendTo(e)),n.text("上传失败")}),d.on("uploadComplete",function(i){$("#"+i.id).find(".progress").remove()})});