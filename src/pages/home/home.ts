import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  letterObj={
    from:"mal",
    to: "malak",
    text:"sadana madana"
  }

  pdfObject: any;

  constructor(public navCtrl: NavController,
    public file: File,
    public fileOpener: FileOpener,
    public platform: Platform
  ) {

  }

  generatePDF() {

    let docDefinition = {
      content: [
        {text : 'Reminder' , style: 'header'},
        {text : new Date().toTimeString(), alignment:'right'},

        {text : 'From', style: 'subheader'},
        {text :this.letterObj.from},

        {text: 'To', style:'subheader'},
        this.letterObj.to,
        {text:this.letterObj.text, style: 'story', margin: [0,20,0,20]},
        {
          ul:[
            'ma',
            'ma',
            'fi',
          ]
        }


      ],
      styles: {
        header:{
          fontSize:18,
          bold:true,
        },
        subheader:{
          fontSize:14,
          bold:true,
          margin:[0,15,0,0]
        },
        story:{
          italic:true,
          alignment:'center',
          width:'%65',
        }

        }
    };

    this.pdfObject = pdfMake.createPdf(docDefinition);

    alert('PDF Generado');
    
  }

  downloadPdf() {

    if(this.platform.is('cordova' )) {
      this.pdfObject.getBuffer((buffer) => {

        var utf8 = new Uint8Array(buffer);
        var binaryArray = utf8.buffer;
        
        var blob = new Blob([buffer], { type: 'application/pdf' });
        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'hello.pdf', blob, { replace: true }).then(fileEntry => {

          this.fileOpener.open(this.file.dataDirectory + 'hello.pdf', 'application/pdf');

        });

      });

      return true;
    }

    this.pdfObject.download();
    

  }

}
