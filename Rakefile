desc "Create a new draft"
task :draft do
  draft = Draft.new(ENV['title'])
  File.open(draft.path, 'w') do |file|
    file.puts draft.body
  end
  puts "New draft generated #{draft.filename}"
end

class Draft
  def initialize(title=nil)
    @title = title || "New Post"
  end

  def path
    File.join(target_dir, filename)
  end

  def body
    <<BODY
---
layout: post
title: #{@title}
---

BODY
  end

  def filename
    "#{slug}.markdown"
  end

  private

  def slug
    @title.gsub(' ','-').downcase
  end

  def target_dir
    '_drafts'
  end
end
