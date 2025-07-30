import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast"; 

const Blog = () => {
  const { toast } = useToast();
  const blogPosts = [
    {
      title: "The Future of Personalized AI: Privacy-First Approach",
      excerpt: "Explore how YoursAI is revolutionizing personalized AI while keeping your data secure and private.",
      author: "YoursAI Team",
      date: "July 15, 2025",
      readTime: "5 min read",
      image: "/lovable-uploads/e6301409-809c-4a91-8a7d-02a8168b9c1e.png"
    },
    {
      title: "Building AI That Learns Your Patterns Without Compromising Privacy",
      excerpt: "Deep dive into our local-first architecture and how we create personalized experiences.",
      author: "AI Research Team",
      date: "July 10, 2025",
      readTime: "8 min read",
      image: "/lovable-uploads/e6301409-809c-4a91-8a7d-02a8168b9c1e.png"
    },
    {
      title: "The Evolution of Digital Twins in AI Technology",
      excerpt: "Understanding how AI twins are changing the way we interact with technology.",
      author: "Tech Innovation Team",
      date: "July 5, 2025",
      readTime: "6 min read",
      image: "/lovable-uploads/e6301409-809c-4a91-8a7d-02a8168b9c1e.png"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => window.history.back()}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent mb-6">
              YoursAI Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Insights, updates, and thoughts on the future of personalized AI technology
            </p>
          </div>

          {/* Featured Post */}
          <Card className="mb-12 overflow-hidden bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <h2 className="text-2xl font-bold mb-4">{blogPosts[0].title}</h2>
                <p className="text-muted-foreground mb-6">{blogPosts[0].excerpt}</p>
                <Button variant="neural" className="flex items-center gap-2">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <img 
                  src={blogPosts[0].image} 
                  alt="Featured post" 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            </div>
          </Card>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <Card key={index} className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-glow transition-neural">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <Card className="mt-16 p-8 text-center bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest insights on AI technology, 
              privacy innovations, and YoursAI updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
              />
              <Button
  variant="neural"
  onClick={() =>
    toast({
      title: "Thanks for subscribing us 🎉",
      description: "You’ll now receive the latest updates in your inbox.",
    })
  }
>
  Subscribe
</Button>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;