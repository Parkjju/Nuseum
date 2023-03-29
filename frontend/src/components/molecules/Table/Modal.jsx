<AnimatePresence>
    {recommendList.map((recommendData) =>
        recommendList.indexOf(recommendData) === visibleIndex ? (
            <motion.div
                style={{
                    width: '100%',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                key={recommendData.id}
                dragSnapToOrigin
                initial={{ x: isNegative ? -300 : 300 }}
                animate={{ x: 0 }}
                transition='none'
            >
                <Slide
                    date={recommendData.created_at}
                    id={recommendData.id}
                    setVisibleIndex={onClick}
                    visibleIndex={visibleIndex}
                    length={recommendList.length}
                />
            </motion.div>
        ) : null
    )}
</AnimatePresence>;
