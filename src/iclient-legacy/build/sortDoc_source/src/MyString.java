class MyString implements Comparable<MyString>{
    public String s;//包装String

    public MyString(String s) {
        this.s = s;
    }

    @Override
    public int compareTo(MyString o) {
        if(o==null||o.s==null) return 1;
        //if(s.length()>o.s.length()) return 1;
        //else if(s.length()<o.s.length()) return -1;
        String s1 = s.toLowerCase();
        String s2 = o.s.toLowerCase();
        return s1.compareTo(s2);
    }
}