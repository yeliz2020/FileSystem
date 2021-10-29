const fs = require("fs");

//Boş bir obje içinde ileride JSON nesnelerini tutacak olan boş bir array oluşturuyoruz.
let obj = {
  employees: [],
};

obj.employees.push({ name: "Employee 1 Name", salary: 2000 });

var json = JSON.stringify(obj); // JS objesini Json'a çeviriyoruz.

//DOSYA YAZMA

fs.writeFile("employees.json", json, "utf8", (err) => {
  if (err) {
    console.log(err);
  }
});

/*DOSYA OKUMA VE GÜNCELLEME
JSON dosyası olduğu için appendFile kullanılmamıştır
Dosya bilgilerini okutup, hata yoksa önce dosya içeriğini konsola yazdırıyoruz 
devamında yeni bilgileri ekleyip dosyayı tekrar yazdırıp hata yoksa dosyayı okutup konsola yazdırıyoruz*/

fs.readFile("employees.json", "utf8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Çalışanlar: ${data}`);
    obj = JSON.parse(data); //Json dosyasından alınan bilgi js objesine çeviriliyor
    obj.employees.push({ name: "Employee 2 Name", salary: 2500 }); //objeye yeni bilgiler ekleniyor
    json = JSON.stringify(obj); //tekrar json'a çeviriliyor
    fs.writeFile("employees.json", json, "utf8", (err) => {
      if (err) console.log(err);
      fs.readFile("employees.json", "utf8", (err, data) => {
        if (err) console.log(err);
        console.log(`Dosya Güncellendi, yeni çalışan listesi ${data}`);
      });
    });
  }
});

//DOSYA SİLME
fs.unlink("employees.json", (err) => {
  if (err) console.log(err);
  console.log("Dosya Silindi");
});
