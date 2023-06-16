SELECT 
	bt.book_id,
    bt.book_name,
    bt.author_id,
    bt.publisher_id,
    bt.category_id,
    bt.cover_img_url,
    
    ab.author_id,
    ab.author_name,
    
    pb.publisher_id,
    pb.publisher_name,
    
    cb.category_id,
    cb.category_name;
    
 select
    count(*)
 FROM
	book_tb bt
    left outer join author_tb ab on(ab.author_id = bt.author_id)
    left outer join publisher_tb pb on(pb.publisher_id = bt.publisher_id)
    left outer join category_tb cb on (cb.category_id = bt.category_id);

select
		bt.book_id,
    bt.book_name,
    bt.author_id,
    bt.publisher_id,
    bt.category_id,
    bt.cover_img_url,
    
    ab.author_id,
    ab.author_name,
    
    pb.publisher_id,
    pb.publisher_name,
    
    cb.category_id,
    cb.category_name
from
	book_tb bt
    left outer join author_tb ab on(ab.author_id = bt.author_id)
    left outer join publisher_tb pb on(pb.publisher_id = bt.publisher_id)
    left outer join category_tb cb on (cb.category_id = bt.category_id)
where
	bt.book_id = 4;