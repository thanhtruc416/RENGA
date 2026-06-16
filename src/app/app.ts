import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Đi từ thư mục hiện tại (app) -> shared -> components -> header -> file header.ts (bỏ đuôi .ts)
import { HeaderComponent } from './shared/components/header/header'; 

// Tương tự cho footer (bạn kiểm tra xem file ts của footer tên là gì nhé, ví dụ ở đây là footer.component)
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
})
export class App {}