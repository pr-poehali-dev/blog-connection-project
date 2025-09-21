import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import Icon from '@/components/ui/icon'

interface Post {
  id: number
  author: {
    name: string
    username: string
    avatar: string
  }
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  timestamp: string
  liked: boolean
}

const mockPosts: Post[] = [
  {
    id: 1,
    author: {
      name: 'Анна Петрова',
      username: '@anna_dev',
      avatar: 'АП'
    },
    content: 'Сегодня запустили новую фичу в приложении! Теперь пользователи могут создавать группы для совместных проектов. Очень рада видеть, как идея воплощается в жизнь 🚀',
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: '2ч',
    liked: false
  },
  {
    id: 2,
    author: {
      name: 'Дмитрий Козлов',
      username: '@dimkoz',
      avatar: 'ДК'
    },
    content: 'Делюсь подборкой лучших дизайн-систем 2024 года. Особенно впечатлила работа команды Airbnb - они создали действительно масштабируемое решение.',
    image: 'https://v3.fal.media/files/rabbit/ZXgn7pUEK__juISIaVIJT_output.png',
    likes: 156,
    comments: 23,
    shares: 45,
    timestamp: '4ч',
    liked: true
  },
  {
    id: 3,
    author: {
      name: 'Мария Сидорова',
      username: '@maria_ux',
      avatar: 'МС'
    },
    content: 'Интересная статья о том, как UX влияет на конверсию в e-commerce. Ключевой вывод: простота навигации увеличивает продажи на 35%',
    likes: 89,
    comments: 12,
    shares: 18,
    timestamp: '6ч',
    liked: false
  }
]

function Index() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [newPost, setNewPost] = useState('')
  const [activeTab, setActiveTab] = useState('home')

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handleNewPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(),
        author: {
          name: 'Вы',
          username: '@you',
          avatar: 'В'
        },
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'сейчас',
        liked: false
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  const sidebarItems = [
    { id: 'home', label: 'Лента', icon: 'Home' },
    { id: 'explore', label: 'Поиск', icon: 'Search' },
    { id: 'messages', label: 'Сообщения', icon: 'MessageCircle' },
    { id: 'notifications', label: 'Уведомления', icon: 'Bell' },
    { id: 'profile', label: 'Профиль', icon: 'User' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex max-w-7xl mx-auto">
        
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border p-6 hidden lg:block">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">SocialHub</h1>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-all duration-200 hover:bg-accent ${
                  activeTab === item.id ? 'bg-primary text-primary-foreground' : 'text-foreground'
                }`}
              >
                <Icon name={item.icon as any} size={24} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-64">
          <div className="max-w-2xl mx-auto p-6">
            
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">Лента</h2>
              <p className="text-muted-foreground">Следите за обновлениями ваших друзей</p>
            </div>

            {/* Create Post */}
            <Card className="mb-8 shadow-sm border-border">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">В</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="О чём думаете?"
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="border-0 shadow-none resize-none p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                      rows={3}
                    />
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Icon name="Image" size={20} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Icon name="Video" size={20} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                          <Icon name="MapPin" size={20} />
                        </Button>
                      </div>
                      <Button 
                        onClick={handleNewPost}
                        disabled={!newPost.trim()}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6"
                      >
                        Опубликовать
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map(post => (
                <Card key={post.id} className="shadow-sm border-border hover:shadow-md transition-shadow duration-200">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-medium">
                          {post.author.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                          <span className="text-muted-foreground text-sm">{post.author.username}</span>
                          <span className="text-muted-foreground text-sm">·</span>
                          <span className="text-muted-foreground text-sm">{post.timestamp}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Icon name="MoreHorizontal" size={20} />
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-foreground leading-relaxed mb-4">{post.content}</p>
                    
                    {post.image && (
                      <div className="mb-4 rounded-xl overflow-hidden border border-border">
                        <img 
                          src={post.image} 
                          alt="Post content" 
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(post.id)}
                        className={`gap-2 hover:bg-red-50 hover:text-red-600 transition-colors ${
                          post.liked ? 'text-red-600' : 'text-muted-foreground'
                        }`}
                      >
                        <Icon name={post.liked ? "Heart" : "Heart"} size={20} className={post.liked ? "fill-current" : ""} />
                        <span className="font-medium">{post.likes}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-primary hover:bg-blue-50">
                        <Icon name="MessageCircle" size={20} />
                        <span className="font-medium">{post.comments}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-green-600 hover:bg-green-50">
                        <Icon name="Share" size={20} />
                        <span className="font-medium">{post.shares}</span>
                      </Button>
                      
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                        <Icon name="Bookmark" size={20} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Trending */}
        <div className="hidden xl:block w-80 p-6">
          <Card className="mb-6 shadow-sm border-border">
            <CardHeader className="pb-4">
              <h3 className="font-semibold text-foreground">Рекомендации</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Иван Иванов', username: '@ivan_dev', followers: '1.2K' },
                { name: 'Елена Смирнова', username: '@elena_design', followers: '856' },
                { name: 'Tech Community', username: '@tech_ru', followers: '5.7K' }
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-muted text-muted-foreground text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground text-sm">{user.name}</p>
                      <p className="text-muted-foreground text-xs">{user.followers} подписчиков</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-xs">
                    Подписаться
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border">
            <CardHeader className="pb-4">
              <h3 className="font-semibold text-foreground">Тренды</h3>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { tag: '#ReactJS', posts: '12.5K' },
                { tag: '#Дизайн', posts: '8.9K' },
                { tag: '#Стартап', posts: '5.2K' },
                { tag: '#Frontend', posts: '15.7K' }
              ].map((trend, i) => (
                <div key={i} className="hover:bg-accent p-2 rounded-lg cursor-pointer transition-colors">
                  <p className="font-medium text-foreground text-sm">{trend.tag}</p>
                  <p className="text-muted-foreground text-xs">{trend.posts} постов</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Index