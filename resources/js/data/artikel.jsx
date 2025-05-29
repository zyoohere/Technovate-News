import { v4 as uuidv4 } from 'uuid';    

export const articlesData = [
    {
    id: '1',
    title: 'The Future of Artificial Intelligence in Healthcare',
    slug: 'future-of-ai-in-healthcare',
    author: {
      name: 'Dr. Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    date: new Date('2023-12-15'),
    category: 'Technology',
    tags: ['AI', 'Healthcare', 'Innovation'],
    excerpt: 'How artificial intelligence is revolutionizing patient care, diagnosis, and treatment planning in modern healthcare systems.',
    content: `
      <p>Artificial intelligence is rapidly transforming the healthcare industry, offering new ways to improve patient outcomes while reducing costs. From diagnostic algorithms that can detect diseases earlier than human physicians to predictive models that can anticipate patient deterioration before it occurs, AI technologies are becoming invaluable tools in modern medicine.</p>
      
      <h2>Early Detection and Diagnosis</h2>
      <p>One of the most promising applications of AI in healthcare is in early disease detection. Machine learning algorithms can analyze medical images such as X-rays, MRIs, and CT scans with remarkable accuracy, often identifying subtle abnormalities that might be missed by human radiologists. For example, AI systems have demonstrated the ability to detect early-stage lung cancer with 94% accuracy, compared to 86% accuracy for experienced radiologists.</p>
      
      <h2>Personalized Treatment Plans</h2>
      <p>AI is also enabling more personalized approaches to treatment. By analyzing vast amounts of patient data, including genetic information, medical history, and lifestyle factors, AI systems can help physicians develop tailored treatment plans that are optimized for individual patients. This precision medicine approach has shown particular promise in oncology, where treatments can be matched to the specific genetic profile of a patient's tumor.</p>
      
      <h2>Challenges and Ethical Considerations</h2>
      <p>Despite its potential, the integration of AI into healthcare systems faces significant challenges. Issues of data privacy, algorithm bias, and the question of accountability when AI systems make mistakes all need to be addressed. Furthermore, there is concern about the potential dehumanization of medicine as more aspects of care become automated.</p>
      
      <p>As we move forward, it will be crucial to strike the right balance between technological innovation and human touch in healthcare. AI should be viewed as a tool to augment human capabilities rather than replace the essential human elements of compassion and intuition that are at the heart of good medical care.</p>
    `,
    imageUrl: 'https://images.pexels.com/photos/3825572/pexels-photo-3825572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    readTime: 8,
    featured: true,
    comments: [
      {
        id: 'c1',
        author: 'James Wilson',
        content: 'This is a fascinating look at how AI is changing healthcare. I work in the field and can confirm that we\'re just scratching the surface of what\'s possible.',
        date: new Date('2023-12-16'),
      },
      {
        id: 'c2',
        author: 'Emma Thompson',
        content: 'I wonder about the ethical implications of relying too heavily on AI for medical diagnoses. Who takes responsibility if the AI makes a mistake?',
        date: new Date('2023-12-17'),
      }
    ]
  },
];