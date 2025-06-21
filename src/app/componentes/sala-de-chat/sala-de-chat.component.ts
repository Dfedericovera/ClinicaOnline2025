import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PostI } from '../../interface/post';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sala-de-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './sala-de-chat.component.html',
  styleUrl: './sala-de-chat.component.css'
})
export class SalaDeChatComponent {

  
  posts: PostI[] | undefined;
  title: string | undefined;
  content: string | undefined;
  post: PostI | undefined;

  constructor(
    private chatService: ChatService,
    private auth: AuthService
  )
  {
    this.chatService.getPosts().then((posts: any) =>
      {
        this.posts = posts;
      });
    this.chatService.subscribePosts().subscribe((value: any) =>
    {
      console.log("Cambios recibidos:", value);
      
      this.chatService.getPosts().then((posts: any) =>
      {
        this.posts = posts;
      });
      console.log('Posts actualizados:', value);
      this.posts = value;
    });

  }

  ngOnInit(): void
  {
  }

  addPost(f:HTMLFormElement)
  {
    this.post = {
      contenido: this.content ?? '',
      usuario: this.auth.usuario?.trim() ?? '',
      timestamp: Date.now(),
    }
    this.chatService.createPost(this.post).then(value =>
    {
      console.log(value);
      f.reset();
    });
  }

  getPost(postId: string | undefined)
  {
    // Implementar la lógica para obtener un post específico por su ID
    // return this.chatService.getPostById(postId);
  }

  esPostPropio(usuario: string | undefined): any
  {
    var clases;
    if (usuario != this.auth.usuario)
    {
      clases = {
        'postPropio': true,
      };
    }
    return clases;
  }



}
